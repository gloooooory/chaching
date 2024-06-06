package com.chaching;

public class HelperFunctions {
    public static String bytesToPayloadString(byte[] data) {
        StringBuilder dataString = new StringBuilder();

        for (int byteOffset = 0; byteOffset < data.length; byteOffset++) {
            byte dataNybbleLow = (byte) (data[byteOffset] & 0x0F);
            byte dataNybbleHigh = (byte) ((data[byteOffset] & 0xF0) >> 4);
            dataString.append(nybbleToChar(dataNybbleHigh));
            dataString.append(nybbleToChar(dataNybbleLow));
            // Spaces for readability
            dataString.append(" ");
        }

        if (!dataString.toString().isEmpty()) {
            final String[] strSplit = dataString.toString().split(" ");
            dataString = new StringBuilder();

            for (final String s : strSplit) {
                final char chr = (char) Integer.parseInt(s, 16);

                if (chr < 0x20 || chr > 0x7E) {
                    // Display non-printable ASCII as a unicode ?
                    dataString.append('\uFFFD');
                } else {
                    dataString.append(chr);
                }
            }
        }

        return dataString.toString();
    }
    private static char nybbleToChar(byte data) {
        char dataChar;

        if (data <= 9) {
            dataChar = (char)('0' + data);
        } else {
            dataChar = (char)('A' + data - 0x0A);
        }

        return dataChar;
    }

    public static int colorGradient(int percentGreen) {
        if (percentGreen > 100) {
            percentGreen = 100;
        }

        int green;
        int red;

        if (percentGreen > 50) {
            // Red should go between 0-255 for 100%-50% green, i.e. green->yellow
            red = (255 * (100 - percentGreen)) / 50;
            green = 255;
        } else if (percentGreen >= 0) {
            // Else, we go between yellow->orange
            green = ( (255 * (percentGreen + 50)) / 100 );
            red = 255;
        } else {
            // If percentage given is less than 0, should be red
            green = 0;
            red = 255;
        }

        return ((0xff << 24) | (red & 0x0ff) << 16) | ((green & 0x0ff) << 8) | (0);
    }
}
