#ifndef DEFINE_H
#define DEFINE_H

#include <stdio.h>
#include <Arduino.h>

// I/O
static const uint8_t TX        =  0;
static const uint8_t RX        =  1;
static const uint8_t RFM_INT0  =  2;
static const uint8_t SW_FORCE  =  4;
static const uint8_t EINK_BUSY =  5;
static const uint8_t EINK_DC   =  6;
static const uint8_t EINK_SS   =  7;
static const uint8_t SPI_SS    =  9;
static const uint8_t RFM_SS    = 10;
static const uint8_t SPI_MOSI  = 11;
static const uint8_t SPI_MISO  = 12;
static const uint8_t SCLK      = 13;
static const uint8_t ADC_AUX   = A0;
static const uint8_t ADC_MAIN  = A1;
static const uint8_t ADC_A2    = A2;
static const uint8_t MOSFET    = A3;
static const uint8_t I2C_SDA   = A4;
static const uint8_t I2C_SCL   = A5;
static const uint8_t ADC_A7    = A7;

// Constants
static const int EINK_BLACK = 0;
static const int EINK_RED   = 1;

// Debug activation
#define SERIAL_BAUD 115200
#ifdef SERIAL_BAUD 
  #define DEBUG( input )    { Serial.print( input ); delay( 1 ); }
  #define DEBUGDec( input ) { Serial.print( input, DEC ); delay( 1 ); }
  #define DEBUGHex( input ) { Serial.print( input, HEX ); delay( 1 ); }
  #define DEBUGln( input )  { Serial.println( input ); delay( 1 ); }
#else
  #define DEBUG( input )
  #define DEBUGDec( input )
  #define DEBUGHex( input )
  #define DEBUGln( input )
#endif

#endif
