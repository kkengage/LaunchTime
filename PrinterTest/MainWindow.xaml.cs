using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace PrinterTest
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private uint[,] logo = new uint[,] {{ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,3,7,7,15,15,31,31,31,63,63,63,63,127,127,127,126,126,254,254,254,254,254,254,252,252,254,254,254,254,254,254,126,126,127,127,127,63,63,63,63,31,31,31,15,15,7,7,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,7,15,31,63,127,127,255,254,254,252,248,248,240,240,224,224,192,192,128,128,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,3,2,2,134,132,132,196,198,226,226,243,241,248,248,252,254,254,255,127,127,63,31,15,7,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{ 0,0,0,0,0,0,0,1,3,15,31,63,127,255,255,254,252,248,240,224,192,128,0,0,0,0,0,0,0,1,1,1,3,2,2,2,4,4,4,12,8,8,8,16,16,16,48,32,32,96,64,64,64,128,128,128,128,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,128,96,56,31,7,1,128,192,224,240,248,252,254,255,255,127,63,31,15,3,0,0,0,0,0,0,0,0,0,0,0,0},
{ 0,0,0,1,7,31,127,255,255,255,255,252,240,195,134,12,24,16,16,32,32,32,96,64,64,192,128,128,128,0,0,0,0,0,0,0,1,1,0,0,1,3,3,1,0,0,4,15,15,0,0,1,15,31,28,56,48,56,28,28,0,0,240,255,63,15,12,28,252,248,255,31,3,0,0,0,224,254,63,7,0,0,0,0,0,128,192,240,252,255,255,255,255,127,31,7,1,0,0,0,0,0,0,0},
{ 0,3,63,255,255,255,255,255,248,192,0,28,227,0,0,0,0,0,0,4,15,15,0,0,0,0,0,0,32,62,63,15,1,0,0,192,248,255,127,0,224,254,255,255,240,120,56,156,254,255,31,194,240,248,56,28,12,12,28,248,248,224,0,128,224,224,32,0,0,0,0,192,128,0,0,0,0,0,224,252,127,7,0,0,0,0,0,0,0,0,192,240,255,255,255,255,255,63,7,0,0,0,0,0},
{ 31,255,255,255,255,255,255,128,0,0,0,0,192,60,7,0,0,0,0,0,192,248,254,31,6,6,14,12,12,12,192,240,240,120,56,57,121,240,225,3,3,3,193,192,128,3,15,15,15,15,3,0,56,63,63,115,99,99,227,71,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,248,255,31,1,0,0,0,0,0,0,0,128,255,255,255,255,255,255,31,0,0,0,0},
{ 255,255,255,255,255,255,31,0,0,0,0,0,0,0,128,240,15,1,0,0,0,0,24,24,56,56,56,63,127,99,96,96,0,0,224,252,255,31,1,240,254,255,247,240,248,248,240,192,192,254,254,62,0,128,248,252,28,24,24,24,56,48,49,3,3,7,7,7,7,7,15,62,127,126,248,240,240,224,224,192,192,192,192,224,224,48,0,0,0,0,0,0,0,255,255,255,255,255,255,255,0,0,0,0},
{ 0,248,255,255,255,255,255,63,3,0,0,0,0,0,0,0,0,240,30,3,0,0,0,0,0,0,0,128,248,252,56,0,1,1,1,0,192,224,224,3,3,192,192,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,127,255,255,240,224,192,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,63,255,255,255,255,255,252,0,0,0,0,0},
{ 0,0,128,240,252,255,255,255,255,127,31,7,1,0,0,0,0,0,0,192,60,7,0,0,0,0,0,0,0,96,252,255,255,207,206,236,252,120,0,128,240,255,31,3,3,3,6,6,6,0,0,0,0,7,31,63,127,252,240,224,224,192,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,7,31,127,255,255,255,255,252,240,128,0,0,0,0,0,0},
{ 0,0,0,0,0,0,192,240,248,254,255,255,255,127,63,15,7,3,1,0,0,128,240,14,1,0,0,0,48,48,0,192,240,240,112,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,1,1,1,195,243,255,15,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,7,15,63,127,255,255,255,254,248,224,192,0,0,0,0,0,0,0,0,0,0},
{ 0,0,0,0,0,0,0,0,0,0,0,128,192,224,240,248,252,254,255,255,127,63,31,15,143,71,35,51,17,9,8,12,12,14,14,14,30,30,28,60,60,56,56,120,120,112,112,240,240,224,224,224,192,192,192,128,128,128,128,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,7,15,15,31,63,127,255,255,254,252,248,240,224,192,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,128,192,224,240,240,248,248,252,252,254,254,255,127,127,63,63,63,31,31,31,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,31,31,31,63,63,63,127,127,255,254,254,252,252,248,248,240,240,224,192,128,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,128,128,192,192,192,192,224,224,224,224,224,224,224,224,224,224,224,224,224,224,224,224,192,192,192,192,128,128,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
};

        private SerialPort _port;

        public MainWindow()
        {
            InitializeComponent();


            _port = new SerialPort();
            try
            {
                _port.PortName = "COM6";
                _port.BaudRate = 9600;                   //9600
                _port.DataBits = 8;                   //8
                _port.StopBits = StopBits.One;                  //1
                _port.Parity = Parity.Space;                    //None            
                                                                // _port.Encoding = Encoding.GetEncoding("iso-8859-2");
                                                                //  _port.DataReceived += new SerialDataReceivedEventHandler(port_DataReceived);
                _port.Open();

                _port.DtrEnable = false;
                _port.RtsEnable = false;
                _port.ReadExisting();
                _port.ErrorReceived += _port_ErrorReceived;


                read();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Not connected");
                throw ex;
            }
        }

        private void read()
        {
            Task.Run(() =>
            {
                try
                {
                    MessageBox.Show("AAAAA");
                    var i = _port.ReadByte();
                    MessageBox.Show("ODCZYTANO: " + i);
                }
                catch (Exception ex)
                {
                    MessageBox.Show("EX:" + ex.ToString());
                    read();
                }
            });
        }

        private void _port_ErrorReceived(object sender, SerialErrorReceivedEventArgs e)
        {
            MessageBox.Show(e.ToString());
        }

        public enum fontStyle
        {
            // Czcionka 9x17 zamiast 12x24 domyslnej
            Small = 1,
            Bold = 8,
            // Poszerzona x 2
            Height2 = 16,
            // Podwyzszona x 2
            Width2 = 32
        }

        /// <summary>
        /// Ustawia czcionke
        /// </summary>
        /// <param name="style"></param>
        private void SetFont(fontStyle style)
        {
            _port.Write((char)27 + "!" + (char)style);
        }

        private void SetInvertedColors(bool inverted)
        {
            //// czarno biale
            _port.Write((char)29 + "B" + (char)(inverted ? 1 : 0));
        }

        /// <summary>
        /// Ustawienia jak po uruchomieniu
        /// </summary>
        private void Reset()
        {
            _port.Write((char)27 + "@");
        }

        public enum textAlignment
        {
            left = 0,
            center = 1,
            right = 2
        }

        public void SetAlignment(textAlignment align)
        {
            _port.Write((char)27 + "a" + (char)align);
        }

        public enum Underline
        {
            none = 48,
            thin = 49,
            thick = 50
        }

        public void SetUnderline(Underline style)
        {
            _port.Write((char)27 + "-" + (char)style);
        }

        public void SetLeft(int charCount)
        {
            _port.Write((char)27 + "B" + (char)charCount);
        }


        // INIT
        private void button_Click(object sender, RoutedEventArgs e)
        {
            Reset();

            _port.Write("" + (char)0x1b + (char)0x40);
            _port.Write("" + (char)0x1d + (char)0x61 + (char)0x04);
            _port.Write("TEST\r\n");

        }


        // ZAPYTAJ
        private void button_Click1(object sender, RoutedEventArgs e)
        {
            _port.Write("e\r\n");
            //_port.Write("" + (char)0x1d + (char)0x72 + (char)0x0); // 1b 76 n 
            //_port.Write("" + (char)0x1d + (char)0x72 + (char)0x1); // 1b 76 n 
            //_port.Write("" + (char)0x1d + (char)0x72 + (char)0x30); // 1b 76 n 
            //_port.Write("" + (char)0x1d + (char)0x72 + (char)0x31); // 1b 76 n 
            //_port.Write("" + (char)0x1b + (char)0x76 + (char)0x0); // 1B 76 n 
            //_port.Write("" + (char)0x1b + (char)0x76 + (char)0x1); // 1B 76 n 
            //_port.Write("" + (char)0x1b + (char)0x76 + (char)0x30); // 1B 76 n 
            _port.Write("" + (char)0x1b + (char)0x76 + (char)0x31); // 1B 76 n 
            //_port.Write("e\r\n");

        }


        //READ
        private void button2_Click(object sender, RoutedEventArgs e)
        {
            var b = new byte[100];
            textBox.Text = _port.BytesToRead.ToString();

            //var readed = _port.Read(b, 0, 1);
            //textBox.Text = readed + ": ";
        }



        public string ConvertUTF8ToWin1250(string source)
        {
            Encoding utf8 = new UTF8Encoding();
            Encoding win1252 = Encoding.GetEncoding(1250);

            byte[] input = utf8.GetBytes(source);  // Note the use of my extension method
            byte[] output = Encoding.Convert(utf8, win1252, input);

            return win1252.GetString(output);
        }


    }


    public enum PL
    {
        Ą = 0xA1,
        ą = 0xB1,
        Ć = 0xc6,
        ć = 0xe6,
        Ę = 0x0,
        ę = 0x0,
        Ł = 0x0,
        ł = 0x0,
        Ń = 0x0,
        ń = 0x0,
        Ó = 0x0,
        ó = 0x0,
        Ś = 0x0,
        ś = 0x0,
        Ź = 0x0,
        ź = 0x0,
        Ż = 0x0,
        ż = 0x0
    }
}
