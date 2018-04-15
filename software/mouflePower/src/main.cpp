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
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, 32, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_COLORED );
        paint.DrawStringAt( 10, 3, "Aux", &Font20, EINK_WHITE );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, 96, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_COLORED );
        paint.DrawStringAt( 10, 3, "Air", &Font20, EINK_WHITE );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, 160, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_WHITE );
        paint.DrawStringAt( 100, 3, "V", &Font20, EINK_COLORED );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, 60, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_WHITE );
        paint.DrawStringAt( 100, 3, "V", &Font20, EINK_COLORED );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, 125, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_WHITE );
        paint.DrawStringAt( 100, 3, " C", &Font20, EINK_COLORED );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, 160+28, paint.GetWidth( ), paint.GetHeight( ) );

        paint.Clear( EINK_WHITE );
        paint.DrawStringAt( 100, 3, "%", &Font20, EINK_COLORED );
        epd.SetPartialWindowBlack( paint.GetImage( ), 0, 160+28*2, paint.GetWidth( ), paint.GetHeight( ) );
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

    // Init
    loop = 0;
    voltages.vAux.old = 0;
    voltages.vMain.old = 0;



    while (1) {
        // Update mosfet state
        voltages.vAux.current = analogReadAvg( ADC_AUX, (uint8_t) 5 ) * ADC_FACTOR * ADC_CAL_VAUX;
        if ( ( mosfetState == MOSFET_OFF ) && ( voltages.vAux.current > CHARGE_ON_THRESHOLD ) ) {
            digitalWrite( MOSFET, (uint8_t) MOSFET_ON );
            mosfetState = MOSFET_ON;
        }
        if ( ( mosfetState == MOSFET_ON ) && ( voltages.vAux.current < CHARGE_OFF_THRESHOLD ) ) {
            digitalWrite( MOSFET, (uint8_t) MOSFET_OFF );
            mosfetState = MOSFET_OFF;
        }

        // Update screen
        if ( loop % 30 == 0 ) {
            unsigned char image[1024];
            Paint paint( image, 128, 23 );    //width should be the multiple of 8
            char temp[10];
            dtostrf( voltages.vAux.current, 5, 2, temp );
            DEBUG("Vaux: " );
            DEBUGln( temp );
            paint.SetWidth( 70 );
            paint.Clear( EINK_WHITE );
            paint.DrawStringAt( 0, 3, temp, &Font20, EINK_COLORED );
            epd.SetPartialWindowBlack( paint.GetImage( ), 25, 125, paint.GetWidth( ), paint.GetHeight( ) );

            float temperature = hdc1080.readTemperature( );
            // TODO: Handle other string size
            dtostrf( temperature, 5, 2, temp );
            DEBUG( "temperature: " );
            DEBUGln( temp );
            paint.Clear( EINK_WHITE );
            paint.DrawStringAt( 0, 3, temp, &Font20, EINK_COLORED );
            epd.SetPartialWindowBlack( paint.GetImage( ), 25, 160 + 28, paint.GetWidth( ), paint.GetHeight( ) );

            float humidity = hdc1080.readHumidity( );
            dtostrf( humidity, 5, 2, temp );
            DEBUG( "humidity: " );
            DEBUGln( temp );
            paint.Clear( EINK_WHITE );
            paint.DrawStringAt( 0, 3, temp, &Font20, EINK_COLORED );
            epd.SetPartialWindowBlack( paint.GetImage( ), 25, 160 + 28 * 2, paint.GetWidth( ), paint.GetHeight( ) );

            epd.DisplayFrame( );
        }

        delay( 1000 );
        loop++;
    }
}