#include <Arduino.h>
#include <Wire.h>
#include "define.h"
#include "epd2in9b.h"
#include "epdpaint.h"
#include "ClosedCube_HDC1080.h"


// Global objects
Epd epd;
ClosedCube_HDC1080 hdc1080;


void refreshScreen( ) {

}


float analogReadAvg( uint8_t pin, uint8_t count ) {
    float sum = 0;
    for ( uint8_t i; i < count; i++ ) sum += analogRead( pin );
    return sum / (float) count;
}


void setup() {
    // Pin initialisation
    pinMode( MOSFET,   OUTPUT );
    digitalWrite( MOSFET, (uint8_t) MOSFET_OFF );
    pinMode( RFM_INT0, INPUT );
    pinMode( SW_FORCE, INPUT );
    pinMode( SPI_SS,   OUTPUT );
    digitalWrite( SPI_SS, HIGH );
    pinMode( RFM_SS,   OUTPUT );
    digitalWrite( RFM_SS, HIGH );
    pinMode( ADC_MAIN, INPUT );
    pinMode( ADC_AUX,  INPUT );
    pinMode( ADC_A2,   INPUT );
    pinMode( ADC_A7,   INPUT );

    // Serial initialisation
    #ifdef SERIAL_BAUD
        Serial.begin( SERIAL_BAUD );
    #endif
    DEBUGln( "mouflePower - Starting" );

    // E-Ink initialisation
    if ( epd.Init( ) != 0 ) {
        DEBUGln( "EINK - Failed init" );
    } else {
        epd.ClearFrame( );
        
        /**
        * Due to RAM not enough in Arduino UNO, a frame buffer is not allowed.
        * In this case, a smaller image buffer is allocated and you have to 
        * update a partial display several times.
        * 1 byte = 8 pixels, therefore you have to set 8*N pixels at a time.
        */
        unsigned char image[1024];
        Paint paint( image, 128, 23 );    //width should be the multiple of 8

        paint.Clear( EINK_COLORED );
        // X, Y
        paint.DrawStringAt( 10, 3, "Camion", &Font20, EINK_WHITE );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, PAGE_HEIGHT, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_COLORED );
        paint.DrawStringAt( 10, 3, "Aux", &Font20, EINK_WHITE );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, PAGE_HEIGHT*3, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_COLORED );
        paint.DrawStringAt( 10, 3, "Air", &Font20, EINK_WHITE );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, PAGE_HEIGHT*5, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_WHITE );
        paint.DrawStringAt( 100, 3, "V", &Font20, EINK_COLORED );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, PAGE_HEIGHT*2, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_WHITE );
        paint.DrawStringAt( 100, 3, "V", &Font20, EINK_COLORED );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, PAGE_HEIGHT*4, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_WHITE );
        paint.DrawStringAt( 100, 3, " C", &Font20, EINK_COLORED );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, PAGE_HEIGHT*6, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_WHITE );
        paint.DrawStringAt( 110, 3, "%", &Font20, EINK_COLORED );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, PAGE_HEIGHT*7, paint.GetWidth( ), paint.GetHeight( ) );
    }

    // Default settings:
	//  - Heater off
	//  - 14 bit Temperature and Humidity Measurement Resolutions
    // TODO: 14 bits are not required
	hdc1080.begin( 0x40 );
}

void loop( ) {
    // Local declarations
    mosfetStates_t mosfetState = MOSFET_OFF;
    uint8_t loop;
    voltages_s voltages;
    oldNew_s temperature;
    oldNew_s humidity;
    boolean updateScreen;
    uint16_t refreshedScreenCnt;

    // Init
    loop = 0;
    voltages.vAux.old = 20;   // Init to 20 to force update on first loop
    voltages.vMain.old = 20;
    temperature.old = 0;
    humidity.old = 0;
    refreshedScreenCnt = 0;
    updateScreen = true;



    while (1) {
        // Update mosfet state
        voltages.vAux.current = analogReadAvg( ADC_AUX, (uint8_t) 5 ) * ADC_FACTOR * ADC_CAL_VAUX;
        voltages.vMain.current = analogReadAvg( ADC_MAIN, (uint8_t) 5 ) * ADC_FACTOR * ADC_CAL_VAUX;
        if ( ( mosfetState == MOSFET_OFF ) && ( voltages.vMain.current > CHARGE_ON_THRESHOLD ) ) {
            digitalWrite( MOSFET, (uint8_t) MOSFET_ON );
            mosfetState   = MOSFET_ON;
            updateScreen  = true;
            Serial.print( "STATE - Charge: ");
            Serial.print( voltages.vMain.current );
            Serial.println( "V" );
        }
        if ( ( mosfetState == MOSFET_ON ) && ( voltages.vMain.current < CHARGE_OFF_THRESHOLD ) ) {
            digitalWrite( MOSFET, (uint8_t) MOSFET_OFF );
            mosfetState   = MOSFET_OFF;
            updateScreen  = true;
            Serial.print( "STATE - OFF: ");
            Serial.print( voltages.vMain.current );
            Serial.println( "V" );
        }

        // Update screen
        if ( loop % 10 == 0 ) {
            char temp[6];
            unsigned char image[1024];
            Paint paint( image, 128, 23 );    //width should be the multiple of 8

            if ( mosfetState == MOSFET_ON ) {
                paint.SetWidth( Font20.Width * 6 );
                paint.Clear( EINK_WHITE );
                sprintf( temp, "Charge" );
                paint.DrawStringAt( 0, 3, temp, &Font20, EINK_COLORED );
                epd.SetPartialWindowBlack( paint.GetImage( ), 35, 4, paint.GetWidth( ), paint.GetHeight( ) );
            } else {
                paint.SetWidth( Font20.Width * 5 );
                paint.Clear( EINK_WHITE );
                sprintf( temp, "OFF" );
                paint.DrawStringAt( 0, 3, temp, &Font20, EINK_COLORED );
                epd.SetPartialWindowBlack( paint.GetImage( ), 55, 4, paint.GetWidth( ), paint.GetHeight( ) );
            }

            if ( abs ( voltages.vMain.old - voltages.vMain.current ) > 0.25 ) {
                dtostrf( voltages.vMain.current, 5, 2, temp );
                DEBUG("Vmain: " );
                DEBUGln( temp );
                paint.SetWidth( Font20.Width * 5 );
                paint.Clear( EINK_WHITE );
                paint.DrawStringAt( 0, 3, temp, &Font20, EINK_COLORED );
                if ( voltages.vMain.current > ( BAT_MAX - BAT_MIN ) * BAT_RED_PERCENTAGE + BAT_MIN ) {
                    epd.SetPartialWindowBlack( paint.GetImage( ), 25, PAGE_HEIGHT*2, paint.GetWidth( ), paint.GetHeight( ) );
                } else {
                    epd.SetPartialWindowRed( paint.GetImage( ), 25, PAGE_HEIGHT*2, paint.GetWidth( ), paint.GetHeight( ) );
                }
                voltages.vMain.old = voltages.vMain.current;
                updateScreen  = true;
            }
            
            if ( abs ( voltages.vAux.old - voltages.vAux.current ) > 0.25 ) {
                dtostrf( voltages.vAux.current, 5, 2, temp );
                DEBUG("Vaux: " );
                DEBUGln( temp );
                paint.SetWidth( Font20.Width * 5 );
                paint.Clear( EINK_WHITE );
                paint.DrawStringAt( 0, 3, temp, &Font20, EINK_COLORED );
                if ( voltages.vAux.current > ( BAT_MAX - BAT_MIN ) * BAT_RED_PERCENTAGE + BAT_MIN ) {
                    epd.SetPartialWindowBlack( paint.GetImage( ), 25, PAGE_HEIGHT*4, paint.GetWidth( ), paint.GetHeight( ) );
                } else {
                    epd.SetPartialWindowRed( paint.GetImage( ), 25, PAGE_HEIGHT*4, paint.GetWidth( ), paint.GetHeight( ) );
                }
                voltages.vAux.old = voltages.vAux.current;
                updateScreen  = true;
            }

            temperature.current = hdc1080.readTemperature( );
            if ( abs( temperature.old - temperature.current ) > 0.5 ) {
                dtostrf( temperature.current, 5, 2, temp );
                DEBUG( "temperature: " );
                DEBUGln( temp );
                paint.Clear( EINK_WHITE );
                paint.DrawStringAt( 0, 3, temp, &Font20, EINK_COLORED );
                epd.SetPartialWindowBlack( paint.GetImage( ), 25, PAGE_HEIGHT*6, paint.GetWidth( ), paint.GetHeight( ) );
                temperature.old = temperature.current;
                updateScreen = true;
            }

            humidity.current = hdc1080.readHumidity( );
            if ( abs( humidity.old - humidity.current ) > 2 ) {
                dtostrf( humidity.current, 5, 2, temp );
                DEBUG( "humidity: " );
                DEBUGln( temp );
                paint.Clear( EINK_WHITE );
                paint.DrawStringAt( 0, 3, temp, &Font20, EINK_COLORED );
                epd.SetPartialWindowBlack( paint.GetImage( ), 25, PAGE_HEIGHT*7, paint.GetWidth( ), paint.GetHeight( ) );
                humidity.old = humidity.current;
                updateScreen = true;
            }
            if ( updateScreen == true ) {
                refreshedScreenCnt ++;
                sprintf( temp, "%d", refreshedScreenCnt );
                paint.SetWidth( Font12.Width*3 );
                paint.SetHeight( 16 );
                paint.Clear( EINK_WHITE );
                paint.DrawStringAt( 0, 3, temp, &Font12, EINK_COLORED );
                epd.SetPartialWindowBlack( paint.GetImage( ), 3, 3, paint.GetWidth( ), paint.GetHeight( ) );

                epd.DisplayFrame( );
                updateScreen = false;
            }
        }

        delay( 1000 );
        loop++;
    }
}