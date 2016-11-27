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
                    Bitmap bmp = new Bitmap(of.FileName);
                    for (var x = 0; x < bmp.Width; x++)
                        for (var y = 0; y < (int)(bmp.Height / 8); y++)
                        {
                            var b = 0;
                            for (var c = 0; c < 8; c++)
                                b += bmp.GetPixel(x, y + c).R > minBrightnss ? (1 << c) : 0;
                            if (sb.Length > 0) sb.Append(",");
                            sb.Append(b.ToString());
                        }
                    textBox.Text = sb.ToString();
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show("Nie udalo sie otworzyc! \r\n\r\n" + ex.ToString());
            }
        }
    }
}
