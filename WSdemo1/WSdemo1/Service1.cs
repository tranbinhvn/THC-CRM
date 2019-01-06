using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace WSdemo1
{
    public partial class Service1 : ServiceBase
    {
        public Service1()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            timer2.Enabled = true;
        }

        protected override void OnStop()
        {
            timer2.Enabled = false;
        }

        private void timer1_Tick(object sender, EventArgs e)
        {

        }

        private void timer2_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            Process[] p = Process.GetProcesses();
            for (int i=0; i<p.Length; i++)
            {
                if (p[i].ProcessName.ToUpper() == "NOTEPAD")
                {
                    p[i].Kill();
                    break;
                }
            }
            
        }
    }
}
