#include <Arduino.h>
#include "define.h"
#include "epd2in9b.h"
#include "epdpaint.h"


// Global objects
Epd epd;

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
        Paint paint( image, 128, 18 );    //width should be the multiple of 8 

        paint.Clear( EINK_BLACK );
        paint.DrawStringAt( 0, 0, "mouflePower", &Font12, EINK_BLACK );
        epd.SetPartialWindowRed( paint.GetImage( ), 24, 32, paint.GetWidth( ), paint.GetHeight( ) );
        epd.DisplayFrame( );
    }


    
}

void loop() {
    // put your main code here, to run repeatedly:
}