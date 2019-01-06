using System;
using System.Diagnostics;
using System.DirectoryServices;
using System.IO;
using System.Net.NetworkInformation;
using System.ServiceProcess;
using System.Threading;

namespace WSdemo2
{
    public partial class Service1 : ServiceBase
    {
        private static Thread T1;
        private static Thread T2;
        private static readonly string path = AppDomain.CurrentDomain.BaseDirectory + "LogFile.txt";
        private static readonly string FolderWillDelete = @"D:\id105";

        private static string networkLog;
        public Service1()
        {
            InitializeComponent();
            this.CanHandlePowerEvent = true;
            this.CanHandleSessionChangeEvent = true;
            // NetworkChange.NetworkAddressChanged += new NetworkAddressChangedEventHandler(AddressChangedCallback);

            if (!System.IO.Directory.Exists(FolderWillDelete))
            {
                System.IO.Directory.CreateDirectory(FolderWillDelete);
            }
        }
        protected override void OnStart(string[] args)
        {
            WriteLog("services Started!");

            T1 = new Thread(SkillProcess);
            T2 = new Thread(EthernetChangedCallback);
            T1.Start();
            T2.Start();
            //timer1.Enabled = true;
            base.OnStart(args);
        }

        protected override void OnStop()
        {
            // Disable Ethernet 
            Enable_LocalAreaConnection(false);

            WriteLog("services stopped!");
        }

        protected override bool OnPowerEvent(PowerBroadcastStatus powerStatus)
        {

            if (powerStatus.HasFlag(PowerBroadcastStatus.PowerStatusChange))
            {
                WriteLog("OnPowerEvent - [Power changed]");

                // Delete data
                DeleteFilesAndFolder(FolderWillDelete);

                // Delete user demo
                DeleteAccount("demo");

                // enable Ethernet 
                Enable_LocalAreaConnection(true);
            }
            else
            {
                WriteLog("OnPowerEvent - " + PowerBroadcastStatus.PowerStatusChange.ToString());
            }
            return base.OnPowerEvent(powerStatus);
        }

        protected override void OnSessionChange(SessionChangeDescription changeDescription)
        {
            WriteLog("OnSessionChange: " + changeDescription.ToString() + "Reason: " + changeDescription.Reason.ToString());
            base.OnSessionChange(changeDescription);
        }


        /// <summary>
        /// Check Network change
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void EthernetChangedCallback()
        {
            NetworkInterface[] adapters = NetworkInterface.GetAllNetworkInterfaces();
            foreach (NetworkInterface n in adapters)
            {
                if (n.Name == "Ethernet")
                {
                    // write log
                    if (n.OperationalStatus.ToString() != networkLog)
                    {
                        WriteLog(string.Format("{0} is {1}", n.Name, n.OperationalStatus + Environment.NewLine));
                        networkLog = n.OperationalStatus.ToString();

                        // disable Network card
                        if (n.OperationalStatus.ToString() == "Down" || string.IsNullOrEmpty(networkLog))
                        {
                            WriteLog("goi ham tat card mang" + n.OperationalStatus.ToString());
                            Enable_LocalAreaConnection(false);
                        }
                    }

                }
                Thread.Sleep(200);
            }
            Thread.Sleep(5000);
            //throw new NotImplementedException();
        }

        /// <summary>
        /// Write message to log file
        /// </summary>
        /// <param name="text"></param>
        private static void WriteLog(string text)
        {
            try
            {
                System.IO.File.AppendAllText(path, " - " + DateTime.Now.ToString() + " : " + text + Environment.NewLine);
            }
            catch (Exception)
            {
                Thread.Sleep(500);
            }
        }

        /// <summary>
        /// Skill application
        /// </summary>
        /// <param name="writelog"></param>
        private static void SkillProcess()
        {
            Process[] p = Process.GetProcesses();
            for (int i = 0; i < p.Length; i++)
            {
                //if (writelog)
                //{
                //    WriteLog(p[i].ProcessName);
                //}

                if (p[i].ProcessName.ToUpper() == "NOTEPAD")
                {
                    p[i].Kill();
                    WriteLog("Skill NOTEPAD");
                    //System.IO.File.Create(AppDomain.CurrentDomain.BaseDirectory + DateTime.Now.ToString("yyyyMMddHHmmss") + "_CloseFile_log.txt");
                    break;
                }
            }
            Thread.Sleep(1000);
        }

        //private void SystemEvents_PowerModeChanged(object sender, PowerModeChangedEventArgs e)
        //{            
        //    WriteLog("PowerModeChangedEventArgs");
        //    SystemEvents.PowerModeChanged -= new PowerModeChangedEventHandler(SystemEvents_PowerModeChanged);

        //}

        /// <summary>
        /// Delete files and Foulders
        /// </summary>
        /// <param name="pathFolder"></param>
        private static void DeleteFilesAndFolder(string pathFolder)
        {
            System.IO.DirectoryInfo dir = new System.IO.DirectoryInfo(pathFolder);
            foreach (FileInfo fi in dir.GetFiles())
            {
                fi.Delete();
                WriteLog("File is deleted: " + fi);
            }
            foreach (DirectoryInfo di in dir.GetDirectories())
            {
                di.Delete(true);
                WriteLog("Directory is deleted: " + di);
            }
        }

        /// <summary>
        /// Delete User account
        /// </summary>
        /// <param name="accountName"></param>
        private static void DeleteAccount(string accountName)
        {
            try
            {
                var localPath = "WinNT://" + Environment.MachineName + ",computer";
                DirectoryEntry localMachine = new DirectoryEntry(localPath);

                foreach (DirectoryEntry item in localMachine.Children)
                {
                    if (item.SchemaClassName == "User")
                    {
                        WriteLog("List user: " + item.Name);
                    }
                }
                DirectoryEntry user = localMachine.Children.Find(accountName, "user");

                if (user == null) return;
                localMachine.Children.Remove(user);
                user.Close();
                localMachine.Close();
                WriteLog("Delete user: " + accountName);
            }
            catch (Exception ex)
            {
                WriteLog("Delete error: " + ex.Message);
            }
        }

        private void Enable_LocalAreaConnection(bool isEnable = true)
        {
            var interfaceName = "Ethernet"; //"Local Area Connection";
            string control;
            if (isEnable)
                control = " admin=ENABLE";
            else
                control = " admin=DISABLE";
            //ProcessStartInfo psi = new ProcessStartInfo("netsh", "interface set interface \"" + interfaceName + "\" " + control);
            ProcessStartInfo psi = new ProcessStartInfo("netsh", "interface set interface name=" + interfaceName + control);
            Process p = new Process();
            p.StartInfo = psi;
            p.Start();
            p.WaitForExit();
            WriteLog(string.Format("Ethernet is {0}", control.Substring(6)));
        }



    }
}
