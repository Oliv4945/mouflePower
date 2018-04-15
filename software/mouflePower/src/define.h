#ifndef DEFINE_H
#define DEFINE_H

#include <stdio.h>
#include <Arduino.h>

// Types
typedef enum {
  MOSFET_ON = HIGH,
  MOSFET_OFF = LOW,
} mosfetStates_t;

// Structures
typedef struct {
  float old;
  float current;
} oldNew_s;

typedef struct {
  oldNew_s vAux;
  oldNew_s vMain;
} voltages_s;

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
static const int EINK_COLORED = 0;
static const int EINK_WHITE   = 1;

//12.86/12.697 = 1,012837678
//14.24/14.079 = 1,011435471
static const float ADC_CAL_VAUX = 1.012;
static const float ADC_FACTOR   = ( 620.0 + 2400.0 ) / 620.0 * 3.26 / 1023.0;

static const float CHARGE_ON_THRESHOLD  = 13.6;
static const float CHARGE_OFF_THRESHOLD = 14.0; // TBC with alternor values

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
