using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Drawing;
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

namespace LogoConverter
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var minBrightnss = 128;
                var sb = new StringBuilder();
                var of = new OpenFileDialog();
                of.DefaultExt = "*.bmp";
                var f = of.ShowDialog();
                if (f.HasValue && f.Value == true)
                {
                    var licz = 0;
                    Bitmap bmp = new Bitmap(of.FileName);
                    var height = (int)Math.Ceiling((bmp.Height / 8d));
                    var width = (int)Math.Ceiling((bmp.Width / 8d)) * 8;
                    for (var y = 0; y < height; y++)
                    {
                        sb.Append("{ ");
                        for (var x = 0; x < width; x++)
                        {
                            licz++;
                            var b = 0;
                            for (var c = 0; c < 8; c++)
                                if ((y * 8) + c < bmp.Height && x < bmp.Width)
                                    b += bmp.GetPixel(x, (y * 8) + c).R < minBrightnss ? (1 << (7 - c)) : 0;

                            if (x > 0) sb.Append(",");
                            sb.Append(b.ToString());
                        }
                        sb.Append("},\r\n");

                    }
                    textBox.Text = sb.ToString();
                    MessageBox.Show(licz.ToString());
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show("Nie udalo sie otworzyc! \r\n\r\n" + ex.ToString());
            }
        }
    }
}
