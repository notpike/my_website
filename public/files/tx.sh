#!/bin/bash

#######################################################
# FILE:     TX.SH                                     #
# AUTHOR:   NOTPIKE WU7ANG                            #
# LICENSE:  MIT                                       #
# FUNCTION: RPI TX SCRIPT FOR YAESU VX-7R             #
#                                                     #
# ==REQUIRED SOFTWARE==                               #
# ~:$ sudo apt update                                 #
# ~:$ sudo apt install cw espeak-ng                   #
#                                                     #
# ==YAESU VX-7R 2.5MM JACK==                          #
#                                                     #
#  +--+  GND     MIC    DATA    SPEAKER               #
#  |  +-------+-------+-------+                       #
#  |  |       |       |       +----+                  #
#  |  |       |       |       |    |                  #
#  |  |       |       |       +----+                  #
#  |  +-------+-------+-------+                       #
#  +--+                                               #
#                                                     #
# ==RPi CIRCUIT==                                     #
#                                       +------+      #
#              +------------------------+PI GND|      #
#              |                        +------+      #
#              |    NPN	                              #
#              +---+\|       440Ω       +----------+  #
#              |     +-----+/\/\/\+-----+PI GPIO 17|  #
#              |   +<|                  +----------+  #
#              |   |                                  #
#              |   | 2.2KΩ                            #
#  +-----------+   +/\/\/\+                           #
#  |                      |                           #
#  |  +------------+      |  +--------------------+   #
#  |  |PI AUDIO OUT+------+--+VX 7R GND BRAID WIRE|   #
#  |  +------------+         +-------------- -----+   #
#  |                                                  #
#  |  +------------+         +--------------------+   #
#  |  |PI AUDIO GND+--+------+VX 7R MIC WHITE WIRE|   #
#  |  +------------+  |      +--------------------+   #
#  |                  |                               #
#  +------------------+                               #
#                                                     #
#######################################################


############ VARIABLES ############

CALLSIGN="AB7CDE"
PHO_CALLSIGN="alpha brovo 7 charlie delta echo"
TEST_SENTENCE="The missile knows where it is at all times. It knows this because it know where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is, whichever is greater, it obtains a difference, or deviation. The guidance subsystem uses deviations to generate corrective commands to drive the missile from a position where it is to a position where it isn't and, arriving at a position where it wasn't, it now is. Consequently, the position where it is, is now the position that it wasn't, and it follows that the position that it was is now the position that it isn't. In the event that the position that it is in is not the position that it wasn't, the system has acquired a variation; the variation being the difference between where the missile is and where it isn't. If variation is considered to be a significant factor, it, too, may be corrected by the GEA. However, the missile must also know where it was. The missile guidance computer scenario works as follows: because a variation has modified some of the information the missile has obtained, it is not sure just where it is, however it is sure where it isn't, within reason, and it knows where it was. It now subtracts where it should be from where it wasn't, or vice versa. And by differentiating this from the algebraic sum of where it shouldn't be and where it was, it is able to obtain the deviation and its variation, which is called error."
GPIO=17

trap ctrl_c INT


############ FUNCTIONS ############

## Trap function for ctrl_c, kills PTT
function ctrl_c() {
	printf "\n\n##STOPING##\n\n"
	tx_off
	exit
}

## TX ON
function tx_on() {
	## Set GPIO to high
	echo "1" > /sys/class/gpio/gpio$GPIO/value 
}

## TX OFF
function tx_off() {
	## Set GPIO to low
	echo "0" > /sys/class/gpio/gpio$GPIO/value 
}

## Numbers Station
function numbers() {
	MAX_COUNT=10
	COUNT=1

	espeak-ng -g 40 "NUMBERS" 2> /dev/null

	while [ "$COUNT" -le $MAX_COUNT ]
	do
        	NUMBER=$(( 1 + RANDOM %100 ))
       		echo $NUMBER | espeak-ng -g 40 2> /dev/null
        	let "COUNT += 1"
	done
}

## Date Time
function date_time() {
	NOW=$(date "+%A, %B %d, %Y, Time %H %M")
	echo "Today is $NOW" | espeak-ng -g 40 2> /dev/null
}

## WAV File
function play_wav() {
	aplay /home/pi/piano2.wav
}


############ INIT ############
 
## Set GPIO17 to out
if [ ! -d "/sys/class/gpio/gpio$GPIO" ]; then
	echo "$GPIO" > /sys/class/gpio/export
	echo "out" >  /sys/class/gpio/gpio$GPIO/direction
fi


############ MAIN ############

## TX ON
tx_on


## Callsign 
#echo $PHO_CALLSIGN | espeak-ng -g 20 2> /dev/null
echo $CALLSIGN | cw -w 25 -t 1200 2> /dev/null

## Voice Example
echo $TEST_SENTENCE | espeak-ng -g 4 2> /dev/null 

## Date Time Example
date_time

## Numbers Station Example
numbers

## WAV Example
#play_wav

## Close
espeak-ng -g 4 -p 25  "END OF LINE" 2> /dev/null


## TX OFF
tx_off