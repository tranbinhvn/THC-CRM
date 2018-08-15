import { Component, OnInit } from '@angular/core';
import { PdfmakeService } from 'pdfmake-apply/pdfmake.service';

@Component({
  selector: 'thc-tt-qhtk-template',
  template: `<button (click)="pdfmake.download()">TT-QHTK PDF</button>`,
  styleUrls: []
})
export class TTQHTKComponent implements OnInit {

  _content: any;
  _styles: any;
  object: { text: string }
  constructor(private pdfmake: PdfmakeService) { }

  ngOnInit() {
    this._styles = {
      
      header: {
        fontSize: 18,
        
        bold: true
        
      },
      bigger: {
        fontSize: 15,
        italics: true,
      },
      textBold :{
        bold: true,
      },
      textBoldItalic: {
        bold: true,
        italics: true,
      },
      textBoldCenter: {
        bold: true,       
        alignment: 'center'
      },
      textBoldUnderline: {
        bold: true,
        decoration: 'underline',
        alignment: 'center'
      },

      subheader: {
        fontSize: 14,
        bold: true,
        margin: [10, 10, 0, 5]

      },
      subTitle: {
        fontSize: 13,
        bold: false,
        margin: [10, 2, 0, 2]

      },
      subTitleBold: {
        fontSize: 13,
        bold: true,
        margin: [10, 5, 0, 5]

      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
        fillColor: '#CCCCCC'
      }
     
    }
    
    this._content = [     

          {text: 'Page 1 File: 1. TTr 1089_Kien toan MHTC.pdf-Bình',  style: 'subheader', color: 'red'},
           
        {
          style: 'tableExample',
          
          table: {
              widths: [30, 80, 110, 75, 200],
            body: [
              [{text: 'STT', style: 'tableHeader', alignment: 'center'},
              {text: 'Người ký', style: 'tableHeader', alignment: 'center'},
              {text: 'Đơn vị', style: 'tableHeader', alignment: 'center'},
              {text: 'Thời gian ký', style: 'tableHeader', alignment: 'center'},
              {text: 'Ý kiến', style: 'tableHeader', alignment: 'center'}],
              [{text: '1', alignment: 'center'}, 'LÊ ĐĂNG DŨNG', 'Tổng Giám đốc - Viettel Global\n Investment JSC','01/07/2017\n21:23:34',''],
                [{text: '2', alignment: 'center'}, 'ĐỖ MẠNH HÙNG','Phó Tổng Giám đốc - Viettel Global\n Investment JSC', '01/07/2017\n14:59:36', ''],
                [{text: '3', alignment: 'center'}, 'ĐÀO XUÂN VŨ','Phó Tổng Giám đốc - Viettel Global\n Investment JSC', '30/06/2017\n17:06:28', '    '],
                [{text: '4', alignment: 'center'}, 'NGUYỄN VIỆT DŨNG','Phó Tổng Giám đốc - Viettel Global\n Investment JSC', '30/06/2017\n14:37:36', ''],
                [{text: '5', alignment: 'center'}, 'NGUYỄN TRUNG KIÊN','Trưởng phòng - Phòng Nhân sự - Khối Quản lý, chức năng - TCT VTG', '30/06/2017\n08:41:20', ''],
            ]
          }
        },
       {text: '', pageBreak: 'before', style: 'subheader'},
        {
          columns: [
            { alignment: 'center', text: 'TẬP ĐOÀN VIỄN THÔNG QUÂN ĐỘI' },
            { style: 'textBoldCenter', text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' }
          ]
        },
        {
          columns: [
            { style: 'textBoldUnderline', text: 'TỔNG CÔNG TY CP ĐẦU TƯ QUỐC TẾ VIETTEL' },
            { style: 'textBoldUnderline', text: 'Độc lập-Tựdo-Hạnh phúc\n\n' }
          ]
        },
        {
          columns: [
            { text: '' },
            { alignment: 'center', text: 'Ngày 04 tháng 06 năm 2017' }
          ]
        },
        {
          columns: [
            { alignment: 'center', text: 'Số: /TTr-VTG-TCNS' },
            { text: '' }
          ]
        },
        {
          columns: [
            { style: 'textBoldCenter', text: 'PHÊ DUYỆT' },
            { text: '' }
          ]
        },
        {
          columns: [
            { alignment: 'center', text: 'Ngày tháng 06 năm 2017' },
            { text: '' }
          ]
        },
        {
          columns: [
            { style: 'textBoldCenter', text: 'TỔNG GIÁM ĐỐC\n\n\n' },
            { text: '' }
          ]
        },
  
        { style: 'textBoldCenter', text: 'TỜ TRÌNH' },
        { style: 'textBoldUnderline', text: 'Về việc kiện toàn mô hình tổ chức Tổng Công ty VTG.\n\n' },
        {
          columns: [
            { alignment: 'right', text: 'Kính gửi: ' },
            { alignment: 'left', text: ' Tổng Giám đốc.\n' }
          ]
        },
       
        {style: 'subheader', text: 'I.	Vấn đề trình:' },  
        {style: 'subTitle', text: ' 1.	Thành lập Trung tâm Quy hoạch Thiết kế, Tổng Công ty VTG.' },
        {style: 'subTitle', text: ' 2.	Kiện toàn mô hình tổ chức, chức năng nhiệm vụ của một số đơn vị thuộc Tổng Công ty VTG phù hợp với thực tế.' },
        
        {style: 'subheader', text: 'II.  Các căn cứ:' },        
        {style: 'subTitle',	text: '  1.	Văn bản số 2881/QĐ-VTQĐ-TCNL ngày 05/6/2017 về việc điều chuyển Trung tâm Thiết kế Toàn cầu từ trực thuộc Tập đoàn sang các đơn vị trực thuộc Tập đoàn đã được Tổng Giám đốc Tập đoàn phê duyệt.' },
        {style: 'subTitle', text: '  2.	Kết luận số 167/KL-KH ngày 19/6/2017 của Tổng Giám đốc về việc kết luận kiện toàn mô hình tổ chức của Tổng Công ty VTG.' },
        {style: 'subTitle', text: '  3.	Căn cứ một số nội dung định hướng chỉ đạo kiện toàn Trung tâm Kinh doanh của PTGĐ Nguyễn Việt Dũng.' },
  
        {style: 'subheader', text: 'III. Nội dung đề xuất:' },       
        {style: 'subTitleBold', text: '  1.	Thành lập Trung tâm Quy hoạch Thiết kế (QHTK):' },
        {style: 'subTitle', text: '  1.1.Quan điểm:' },
        {text: '-	Trung tâm QHTK là đầu mối chủ trì, chịu trách nhiệm toàn diện về việc quản lý, quy hoạch, khảo sát thiết kế, hỗ trợ đầu tư mua sắm, quản lý giám sát tài nguyên mạng lưới tại các Công ty thị trường và khảo sát quy hoạch thiết kế mạng lưới thị trường mới.' },
        {text: `- Trung tâm QHTK chịu trách nhiệm hướng dẫn, đào tạo, xây dựng lực lượng ngành dọc và thẩm định quy hoạch tổng thể từng thị trường từ 1-2 lần trong một năm.`},       
        {style: 'subTitle', text: '  1.2.Tổ chức bộ máy:' },
        {text: `-  Trung tâm QHTK do PTGĐ Tổng Công ty phụ trách quy hoạch thiết kế trực tiếp quản lý, điều hành.
                 -  Tổ chức của Trung tâm gồm: Phòng QHTK Mạng lõi, Phòng QHTK Vô tuyến; Phòng QHTK Truyền dẫn, Phòng QHTK Cơ điện, Phòng QHTK Cố định Băng rộng, Phòng QHTK Công nghệ thông tin; Phòng Thiết kế Hạ tầng và Ban PM Dự án.`},
        {style: 'subTitle', text: '1.3.Chi tiết chức năng, nhiệm vụ các đơn vị Trung tâm QHTK: Phụ lục 03.\n' },
        
        {style: 'subTitleBold', text: '2.	Kiện toàn mô hình tổ chức Trung tâm Kinh doanh:' },
       
        {style: 'subTitle', text: '2.1.Quan điểm:' },
        { text: `-  Xây dựng Trung tâm Kinh doanh Tổng Công ty VTG trở thành Trung tâm chỉ huy, điều hành hoạt động kinh doanh của Tổng Công ty VTG và các Công ty thị trường.
                  -  Xây dựng chuẩn hóa hệ thống guideline về kinh doanh; Đưa công cụ phần mềm vào quản lý để mornitor, cảnh báo sớm các hoạt động kinh doanh của các thị trường và Tổng Công ty VTG.
                  -  Tập trung tri thức, nguồn lực tốt nhất tại Trung tâm Kinh doanh để giải quyết các vấn đề khó của thị trường: Lập các chuyên đề, tập trung nguồn lực giải quyết dứt điểm cho thị trường. ` },
        {style: 'subTitle', text: '2.2.Các nội dung điều chỉnh:' },
        {text: `  -  Điều chuyển chức năng nhiệm vụ  BigData và Kênh phân phối từ Phòng Digital và Phòng Kênh phân phối cũ về Phòng Di động để tập trung nguồn lực cho dịch vụ di động.
                  -  Điều chỉnh và đổi tên phòng Quảng cáo &Truyền thông thuộc thuộc khối Quản lý chức năng thành phòng Quảng cáo Truyền thông & Digital thuộc Trung tâm Kinh doanh để tập trung thực hiện các nhiệm vụ liên quan tới quảng cáo, xây dựng thương hiệu, hình ảnh của VTG và các Công ty thị trường trên các kênh truyền thống và kênh digital. Nhiệm vụ truyền thông nội bộ (công tác tuyên huấn) hiện tại được điều chuyển về phòng Chính trị Tổng Công ty.
                  -  Đổi tên thành phòng Digital&Thương mại Điện tử thành phòng Dịch vụ Thanh toán Điện tử với chức năng nhiệm vụ chính tập trung phát triển dịch vụ thanh toán điện tử (ví điện tử/emoney…) tại các Công ty thị trường để tạo sự đột phá cho hoạt động SXKD. `},
        { style: 'subTitleBold', text: '3.	Kiện toàn Trung tâm Phần Mềm, Tổng Công ty VTG:' },
  
        {style: 'subTitle', text: '3.1.Quan điểm:' },
        { text: `-  Trung tâm Phần Mềm Tổng Công ty VTG là đầu mối chủ trì, chịu trách nhiệm thực hiện các nhiệm vụ:
          + Tin học hóa các hoạt động quản lý, kinh doanh, kỹ thuật xuyên suốt từ Tổng Công ty VTG đến các thị trường.
          + Sản xuất phần mềm: Thực hiện phân tích, thiết kế, outsource phát triển phần mềm (chỉ lập trình một số module phần mềm).
          + Triển khai các hệ thống bigdata phục vụ quản lý số liệu kinh doanh, kỹ thuật, quản lý.
          + Nghiên cứu công nghệ nền tảng mới áp dụng vào các sản phẩm phần mềm trang bị cho toàn VTG để hiện đại hóa hệ thống CNTT và giảm chi phí đầu tư (hệ quản trị CSDL, SAN storage ảo, hệ thống Midleware…) `},
         {style: 'subTitle', text: '3.2.Tổ chức bộ máy:' },
        { text: `-  Trung tâm Phần mềm do PTGĐ Tổng Công ty phụ trách kinh doanh chỉ đạo, điều hành.
                 -  Tổ chức bộ máy gồm 03 phòng: Phòng Công nghệ Phần mềm; Phòng Phần mềm; Phòng Triển khai Bigdata.`},
        
        {style: 'subTitle', text: '3.3.Chi tiết chức năng, nhiệm vụ đơn vị Trung tâm Phần mềm: Phụ lục 04.' },
  
        { style: 'subTitleBold', text: '4.	Một số điều chỉnh khác:' },
  
        {style: 'subTitle', text: '4.1.Sáp nhập Phòng Đào tạo với Phòng Tổ chức Nhân sự: Điều động nguyên trạng nhân sự, chức năng nhiệm vụ của phòng Đào tạo hiện tại về thuộc phòng Tổ chức nhân sự.' },
        {style: 'subTitle', text: '4.2.Kiện toàn chức năng, nhiệm vụ phòng Kỹ thuật, Tổng Công ty:' },
        {text: `-	Phòng Kỹ thuật là đầu mối chủ trì xây dựng, ban hành các KPIs về công tác kỹ thuật và CNTT; Cùng với Tổng Công ty VTNet quản lý, giám sát, hỗ trợ công tác khai thác vận hành mạng lưới tại các Công ty thị trường.
           -  Phòng Kỹ thuật tổ chức theo từng nhóm chức năng và hoạt động theo mô hình G-S-M, tận dụng tối đa nguồn lực và tri thức kỹ thuật tới thị trường.
           -  Chi tiết chức năng, nhiệm vụ phòng Kỹ thuật:  Phụ lục 05. `},
        { style: 'subTitleBold', text: '5.	Mô hình tổ chức tổng thể Tổng Công ty VTG:' },
        {style: 'subTitle', text: '5.1.Mô hình tổ chức tổng thể Tổng Công ty VTG:	Phụ lục số 01.' },
        {style: 'subTitle', text: '5.2.Danh sách đề xuất sắp xếp, điều động nhân sự:	Phụ lục số 02.' },
  
        { style: 'subheader', text: 'IV. Tổ chức thực hiện:\n' },
  
        { style: 'subTitleBold', text: '1.	Phòng Chính trị,Tổng Công ty VTG:' },
        {
          text: '-	Phối hợp với các đơn vị hoàn thiện các thủ tục giao nhiệm vụ cho các cán bộ quản lý đúng quy trình về công tác cán bộ xong trước ngày 30/6/2017.'
        },  
       
        { style: 'subTitle', text: '2.	Phòng Tổ chức Nhân sự, Tổng Công ty VTG:' },
        {
        text: `-  Sắp xếp nhân sự theo tiêu chuẩn, vị trí chức danh theo mô hình mới. Phối hợp với các cơ quan, đơn vị xây dựng hoàn thiện luồng thông tin vận hành, cơ chế phân cấp trình Tổng Giám đốc phê duyệt. `},
  
        { style: 'subTitleBold', text: '3.	Lãnh đạo, chỉ huy các đơn vị:' },
        {
          text: `-  Xây dựng mô tả công việc cho từng chức danh công việc tại đơn vị mình.
            -  Chủ trì xây dựng hoàn thiện quy định chức năng, nhiệm vụ, luồng thông tin vận hành, cơ chế phân cấp trình Tổng Giám đốc phê duyệt.
            -  Thời hạn xong trước ngày 30/06/2017. `},  

        {text:[
          { style: 'subTitleBold', text: '4. '},'Mô hình chính thức vận hành từ ngày 01/07/2017. Trong quá trình thực hiện cơ quan Tổ chức nhân sự tổng hợp báo cáo đề xuất điều chỉnh, bổ sung những vấn đề bất cập, tồn tại.']
        },
       
        {style: 'subTitle',   text: '	Kính trình Tổng Giám đốc xem xét phê duyệt./.\n\n'},    
          
       
        {
          columns: [
            { style: 'textBoldCenter', text: 'PTGĐ KINH DOANH' },
            { style: 'textBoldCenter', text: 'PTGĐ KỸ THUẬT	' },
            { style: 'textBoldCenter', text: 'PTGĐ CHUYÊN TRÁCH' },
  
  
          ]
        },
        { style: 'textBoldCenter', text: '\n\n\n\n\n\n\n\n' },
        {
          columns: [
            { style: 'textBoldCenter', text: 'PHÒNG TỔ CHỨC NHÂN SỰ' },
  
  
          ]
        },
  
        { style: 'textBoldCenter', text: '\n\n\n\n' },
        {
          text: `         
        Nơi nhận:
        -Ban TGĐ;
        -Công ty thị trường;
        -Các khối cơ quan VTG;
        -Lưu:TCNS; Kiên(04b).
        `
        },
      
  


















      {text: 'File: 4. Chuc nang nhiem vu TT QHTK.pdf-Tuyền', pageBreak: 'before',  style: 'subheader', color: 'red'},
       
      { style: 'textBoldCenter', text: 'PHỤ LỤC 03' },
      { style: 'textBoldCenter', text: 'CHỨC NĂNG, NHIỆM VỤ TRUNG TÂM QUY HOẠCH THIẾT KẾ,' },
      { style: 'textBoldCenter', text: 'TỔNG CÔNG TY VTG\n\n\n' },
      { style: 'subheader',text: 'I. Chức năng, nhiệm vụ Trung tâm thiết kế (QHTK):'  },
      {style: 'textBold', text: '1.Quan điểm:'},
      {text:'Trung tâm Thiết kế Toàn cầu là đơn vị hoạt động theo mô hình G-S-M đồng thời cũng là đơn vị sản xuất trực tiếp trực thuộc Tổng Công ty. Các sản phẩm của Trung tâm Thiết kế Toàn cầu bao gồm các bản quy hoạch định cỡ tổng thể cho các thị trường, phối hợp cùng ngành dọc thị trường ban hành các bản thiết kế chi tiết cho toàn bộ các thị trường đang khai thác, chủ trì khảo sát thiết kế chi tiết cho các thị trường mới và tham gia khảo sát, định cỡ cho các thị trường đang xúc tiến đầu tư của Tập đoàn.'},
      {style: 'textBold', text: '2. Chức năng Hướng dẫn – Hỗ trợ - Giám sát (GSM) '},
      {style: 'textBold', text: ' Hướng dẫn – Guiding '},
      {text: ' - Tổ chức đào tạo, hướng dẫn về nghiệp vụ quy hoạch thiết kế tại các công ty thị trường đối với các mảng như sau: (1) Vô tuyến, (2) Truyền dẫn, (3) Cơ điện, (4) Mạng lõi, (5) Công nghệ Thông tin, (6) Cố định Băng rộng và (7) Hạ tầng nhà trạm.\n - Ban hành các guideline, hướng dẫn, quy cách trong việc triển khai, lắp đặt theo đúng các thiết kế đã được phê duyệt.\n - Sau khi hoàn thành set up và tối ưu trước khai trương cho mạng mới hoặc thị trường mới: tổ chức đào tạo và chuyển giao cho công ty thị trường.' }
      ,{style: 'textBold', text: ' Hỗ trợ - Supporting '},
      { text: '- Định hướng về công nghệ và giải pháp ứng dụng cho mạng lưới các thị trường nước ngoài.\n - Thẩm định và phê duyệt các bản quy hoạch định cỡ tổng thể từ 1-2 lần/năm cho các thị trường.\n - Ban hành các chỉ tiêu kỹ thuật, tham gia đàm phán với đối tác và hoàn thiện các phụ lục hợp đồng cho tất cả các mảng nhằm đảm bảo tiến độ hàng hóa thiết bị triển khai lắp đặt phục vụ sản xuất kinh doanh của các thị trường. '},
      {style: 'textBold', text: ' Giám sát – Monitoring '},
      {text: '- Quản lý hiệu suất sử dụng tài nguyên mạng lưới, đề xuất các giải pháp nhằm tăng hiệu quả sử dụng tài nguyên mạng lưới, tối ưu chi phí đầu tư và chi phí vận hành khai thác.\n - Quản lý hệ thống cơ sở dữ liệu mạng lưới của các thị trường nhằm giám sát các thị trường lắp đặt và vận hành khai thác theo đúng thiết kế đã phê duyệt. '},
      {style: 'textBold', text: '3. Chức năng hoạt động sản xuất trực tiếp '},
      {style: 'textBoldItalic', text: '3.1. Công tác quy hoạch định cỡ '},
      {text: '- Chủ trì thực hiện công tác lựa chọn công nghệ/giải pháp, cho tất cả các thị trường nước ngoài mà Viettel đầu tư.\n - Thẩm định và phê duyệt quy hoạch, định cỡ mạng viễn thông 1-2 lần trong một năm.\n - Quản lý cơ sở dữ liệu, tài nguyên mạng lưới và hiệu suất sử dụng của các thị trường.\n - Nghiên cứu, đề xuất các công dụng cụ, phương pháp tính toán, giải pháp công nghệ phục vụ quy hoạch định cỡ mạng lưới nhằm tiết kiệm chi phí, nâng cao chất lượng mạng, rút ngắn thời gian triển khai. '},
      {style: 'textBoldItalic', text: '3.2. Công tác đầu tư mua sắm '},
      {text: '- Đầu tư thiết bị mạng lõi, vô tuyến, truyền dẫn, mạng lõi, cơ điện, cố định băng rộng, CNTT, hạ tầng nhà trạm cho các thị trường nước ngoài: Xây dựng chỉ tiêu kỹ thuật, phối hợp với Phòng Mua sắm Tổng Công ty và Phòng Đầu tư Tập đoàn chấm thầu và hoàn thiện phụ lục hợp đồng về kỹ thuật cho các mảng.\n  - Quản lý, đánh giá các nhà cung cấp thiết bị (vendor).\n - Hỗ trợ công tác khai thác mạng lưới, làm việc với đối tác giải quyết các phát sinh về thiết bị, quy hoạch thiết kế trong quá trình khai thác. '},
      {style: 'textBoldItalic', text: '3.3. Công tác khảo sát, thiết kế  '},
      { text: '- Chủ trì xây dựng, đề xuất các quy định, hướng dẫn (guideline) về công tác khảo sát thiết kế mạng ở tất cả các lớp mạng cho các công ty thị trường.\n - Công tác thiết kế chi tiết đối với các thị trường, cụ thể:\n  Với các thị trường đang hoạt động: TT TKTC thẩm định và phê duyệt các bản thiết kế, Phòng QHTK các thị trường chủ trì thực hiện.\n  Với thị trường triển khai mới: Trực tiếp khảo sát, thiết kế tổng thể mạng lưới đối với 100% vị trí, node mạng.\n - Nghiên cứu đề xuất các công nghệ, thiết bị, công cụ dụng cụ, tính năng, giải pháp trong công tác thiết kế để tăng hiệu quả, nâng cao chất lượng mạng, tối ưu chi phí.\n - Kiểm tra việc triển khai, vận hành khai thác theo đúng thiết kế, chỉ đạo điều chỉnh các thiết kế cho phù hợp với thực tế khai thác.\n - Quản lý cơ sở dữ liệu mạng lưới. '},
      {style: 'textBoldItalic', text: '3.4. Công tác set up thị trường mới '},     
      {text: '- Chủ trì thực hiện thiết kế HLD, LLD cho tất cả các mảng.\n - Chủ trì phối hợp trong công tác lắp đặt, tích hợp các node mạng lõi, commissioning/intergrated hệ thống, đưa các node mạng tại tổng trạm vào vận hành khai thác.\n - Tối ưu mạng lưới trước khai trương (pre – launching).\n - Tổ chức bộ máy, đào tạo và chuyển giao cho công ty thị trường. '},  
      {style: 'textBoldItalic', text: '3.5. Công tác quản lý ngành dọc quy hoạch thiết kế '},  
      {text: '- Định hướng mục tiêu, kế hoạch năm cho Phòng QHTK tại các thị trường.\n - Định hướng về công nghệ, giải pháp trong việc ứng dụng vào mạng lưới tại các thị trường.\n - Đào tạo, hướng dẫn Phòng QHTK các công ty thị trường, đảm bảo thực hiện chuyên môn nghiệp vụ về kiểm soát các KPI đầu tư, quy hoạch thiết kế mạng lưới.\n - Quản lý, đánh giá công tác quy hoạch thiết kế tại các thị trường nước ngoài'},     
      {style: 'textBold', text: 'II. Chức năng, nhiệm vụ các đơn vị thuộc Trung tâm QHTK. '},  
      {style: 'textBold', text: '1. Phòng Quy hoạch Thiết kế Vô tuyến '}, 
      {style: 'textBoldItalic', text: '1.1. Quy hoạch định cỡ '},   
      { text: '- Đối với các thị trường đang hoạt động: Thẩm định và phê duyệt quy hoạch hoạch tổng thể từ 1 đến 2 lần/năm. Ngoài ra có thể thực hiện quy hoạch định cỡ cho giai đoạn dài hạn theo yêu cầu.\n - Đối với các thị trường mới: Quy hoạch phân bổ BSC/RNC đến mức tỉnh cho thị trường đang hoạt động, ban hành guideline/hướng dẫn quy hoạch chi tiết đến mức LAC/RAC/CI/tần số, BSIC, SC….\n - Đối với thị trường đang xúc tiến đầu tư: Chủ trì thực hiện quy hoạch định cỡ mạng vô tuyến phục vụ tính toán hiệu quả dự án hoặc xây dựng hồ sơ thầu giấy phép mới.\n - Quản lý hiệu suất sử dụng tài nguyên mạng Vô tuyến: đánh giá hiệu suất sử dụng tài nguyên hệ thống mạng lưới để có các cảnh báo điều chỉnh quy hoạch, đầu tư kịp thời. '},   
      {style: 'textBoldItalic', text: '1.2. Thiết kế '},
      {text: '- Thị trường đang hoạt động:\n   Đưa ra định hướng, thẩm định thiết kế và hướng dẫn khảo sát các trường hợp khó.\n  Quản lý và kiểm soát cơ sở dữ liệu mạng vô tuyến; quản lý công cụ dụng cụ hỗ trợ thiết kế, các phần mềm, licence thiết kế cho thị trường.\n - Thị trường mới (đã có giấy phép): Chủ trì xây dựng mô hình truyền sóng, khảo sát thiết kế chi tiết 100% số vị trí trạm để bàn giao cho công ty thị trường triển khai, hỗ trợ thị trường điều chỉnh thiết kế cho phù hợp điều kiện triển khai thực tế.\n - Thị trường xúc tiến đầu tư: Tham gia khảo sát đánh giá thị trường đang xúc tiến đầu tư. '},
      {style: 'textBoldItalic', text: '1.3. Tối ưu trước khai trương cho mạng mới '},
      {text: '- Chủ trì tối ưu trước khai trương (pre-launching optimization) bảo đảm chỉ tiêu chất lượng mạng cho khai trương mạng mới hoặc thị trường mới.'},
      {style: 'textBoldItalic', text: '1.4. Đầu tư mua sắm:'},
      {text: '- Đầu tư mua sắm thiết bị vô tuyến và công cụ dụng cụ cho các thị trường, bao gồm: Xây dựng chỉ tiêu kỹ thuật, đánh giá thầu, lựa chọn nhà cung cấp về phần kỹ thuật, hoàn thiện các phụ lục kỹ thuật trong hợp đồng.\n  - Đầu tư mua sắm vật tư, phụ kiện, công cụ dụng cụ, máy đo, phần mềm ngành vô tuyến: Xây dựng chỉ tiêu kỹ thuật, phối hợp với phòng Mua sắm Tổng Công ty đánh giá thầu, lựa chọn nhà cung cấp về phần kỹ thuật.\n - Hỗ trợ công tác KCS hàng hóa thiết bị vô tuyến.\n - Đánh giá các nhà cung cấp thiết bị (vendor). '},
      {style: 'textBoldItalic', text: '1.5. Nhiệm vụ khác: '},
      {text: '- Nghiên cứu giải pháp: Nghiên cứu và ứng dụng các tính năng, cấu trúc của thiết bị và hệ thống, đề xuất triển khai áp dụng các công nghệ mới, giải pháp mới, tính năng nhằm tối ưu, nâng cao khả năng phủ sóng và dung lượng của mạng vô tuyến.\n - Tham gia xây dựng các chiến lược về vô tuyến theo từng giai đoạn đối với thị trường: Chiến lược sử dụng tần số, chiến lược đầu tư 3G/4G/Wifi offload \n- Chủ trì xây dựng các quy trình/guideline/hướng dẫn liên quan đến nhiệm vụ của ngành vô tuyến.\n - Nhiệm vụ đào tạo: Tổ chức đào tạo nội bộ nhằm nâng cao trình độ chuyên môn, hội thảo để giải quyết các việc khó, đề xuất các khóa đào tạo về kỹ năng nghiệp vụ nhằm nâng cao chất lượng và hiệu suất lao động. '},
      {style: 'textBold', text: '2. Phòng Quy hoạch Thiết kế Mạng lõi'},
      {style: 'textBoldItalic', text: '2.1. Quy hoạch định cỡ '},
      { text: '- Thẩm định và phê duyệt quy hoạch định cỡ tổng thể 1-2 lần/năm hệ thống mạng lõi (CS Core, PS Core, PSTN, OCS và VAS) cho các thị trường đang hoạt động và đang đầu tư.\n - Quản lý hiệu suất sử dụng tài nguyên mạng lõi: Theo dõi, đánh giá hiệu suất sử dụng tài nguyên hệ thống mạng lưới để có các cảnh báo điều chỉnh quy hoạch, đầu tư kịp thời.\n - Quản lý cơ sở dữ liệu: Chủ trì đánh giá nhu cầu và lập đề xuất tạo mới, thay đổi và hủy cơ sở dữ liệu (CSDL) mạng lõi. Thực hiện cập nhật và đối soát thông tin trên CSDL định kỳ để đảm bảo tính chính xác của dữ liệu. '},
      {style: 'textBoldItalic', text: '2.2. Thiết kế '},
      {text: `- Thị trường đang hoạt động:  
                 Đưa ra định hướng, thẩm định thiết kế hàng năm khi bổ sung node mạng lưới. 
                 Chủ trì thiết kế chi tiết cho tổng trạm mới. 
              - Thị trường xúc tiến đầu tư: Tham gia khảo sát đánh giá thị trường đang xúc tiến đầu tư.
               - Thị trường mới (đã có giấy phép): Chủ trì xây dựng thiết kế chi tiết 100% node mạng và bàn giao cho công ty thị trường triển khai, hỗ trợ thị trường điều chỉnh thiết kế cho phù hợp điều kiện triển khai thực tế`},
    
      {style: 'textBoldItalic', text: '2.3. Đầu tư mua sắm'},
      { text: `- Chủ trì hoặc hỗ trợ đàm phán, ký hợp đồng hỗ trợ kỹ thuật (SLA) cho các thị trường.
       - Đầu tư mua sắm thiết bị mạng lõi: Xây dựng chỉ tiêu kỹ thuật, phối hợp với các đơn vị chấm thầu, báo cáo và đàm phán ký hợp đồng. Theo dõi, đôn đốc tiến độ giao hàng. 
       - Xây dựng chỉ tiêu kỹ thuật cho thiết bị đầu cuối, SIM, thẻ cào; thực hiện quy hoạch thông số kỹ thuật cho SIM. 
      - Hỗ trợ công tác KCS hàng hóa mạng lõi. 
      - Đánh giá các nhà cung cấp thiết bị (vendor). `},
      {style: 'textBoldItalic', text: '2.4. Triển khai dự án (bộ máy SETUP)'},
      {text: `- Đảm nhiệm quản lý dự án đối với việc triển khai mạng mới hoặc các thị trường mới.
       - Thẩm định và phê duyệt các bản thiết kế chi tiết (high/low level design) cho các hệ thống mạng lõi.`},
       {style: 'textBold', text: '3. Phòng Quy hoạch Thiết kế Truyền dẫn'},
       {style: 'textBoldItalic', text: '3.1.  Quy hoạch định cỡ '},
       {text: `- Thẩm định và phê duyệt quy hoạch định cỡ tổng thể từ 1 đến 2 lần/năm cho các phân lớp mạng truyền dẫn SDH, DWDM, Metro Ethernet, IPBN, MPBN, Viba, VSAT tại các thị trường nước ngoài. 
       - Quản lý hiệu suất sử dụng tài nguyên mạng truyền dẫn: Theo dõi, giám sát hiệu suất sử dụng tài nguyên mạng truyền dẫn và đề xuất các giải pháp để nâng cao hiệu suất sử dụng tài nguyên các phân lớp mạng.
        - Nghiên cứu, đề xuất triển khai áp dụng các công nghệ mới, các giải pháp mới nhằm tối ưu và nâng cao độ khả dụng mạng truyền dẫn. 
       - Chủ trì xây dựng các quy trình/guideline/hướng dẫn liên quan.`},
       {style: 'textBoldItalic', text: '3.2. Đầu tư mua sắm'},
       { text: `- Đầu tư mua sắm các hạng mục truyền dẫn quang, IP, truyền dẫn vô tuyến (Viba, VSAT), cáp quang và phụ kiện: Xây dựng các chỉ tiêu kỹ thuật, chấm thầu thiết bị, phối hợp với Phòng Mua sắm TCT và Phòng Đầu tư Tập đoàn hoàn thiện các hợp đồng mua sắm. Theo dõi, đôn đốc tiến độ hàng về của các dự án sau khi đã đầu tư. 
       - Hỗ trợ KCS hàng hóa thiết bị truyền dẫn. 
       - Đánh giá các nhà cung cấp thiết bị (vendor).`},
       {style: 'textBoldItalic', text: '3.3. Thiết kế'},
       { text: `- Thị trường đang hoạt động: 
         Đưa ra định hướng, thẩm định thiết kế hàng năm khi bổ sung node mạng lưới. 
         Chủ trì thiết kế chi tiết cho tuyến cáp trục mới. 
         Hướng dẫn các thị trường thực hiện thiết kế các tuyến cáp nhánh. 
        - Thị trường xúc tiến đầu tư: Tham gia khảo sát đánh giá thị trường đang xúc tiến đầu tư. 
       - Thị trường mới (đã có giấy phép): Chủ trì xây dựng thiết kế chi tiết 100% node mạng và bàn giao cho công ty thị trường triển khai, hỗ trợ thị trường điều chỉnh thiết kế cho phù hợp điều kiện triển khai thực tế.`},
       {style: 'textBoldItalic', text: '3.4. Thiết kế và triển khai dự án (bộ máy SETUP) '},
       { text: `- Phối hợp với các đơn vị khảo sát thực tế, chủ trì thiết kế chi tiết (high/low level design) cho các hệ thống trục mạng truyền dẫn. 
       - Đối với thị trường mới: Chủ trì triển khai lắp đặt, tích hợp thiết bị mạng truyền dẫn: DWDM, IP Core, Metro. Xây dựng các bản thiết kế LLD cho thị trường mới. Lập hồ sơ thiết kế chi tiết mạng lưới đến mức trạm/port/card (sơ đồ kết nối logic, sơ đồ sử dụng cáp quang cho từng phân lớp mạng). `},
       {style: 'textBold', text: '4. Phòng Quy hoạch Thiết kế Cố định Băng rộng '},
       {style: 'textBoldItalic', text: '4.1. Quy hoạch định cỡ'},
       { text: `- Thẩm định và phê duyệt quy hoạch định cỡ tổng thể 1-2 lần/năm dịch vụ Internet và Truyền hình (Bao gồm cả phần thiết bị và mạng quang ngoại vi) cho các thị trường đang hoạt động và đang đầu tư có triển khai dịch vụ. 
       - Quản lý hiệu suất sử dụng tài nguyên mạng lõi: Theo dõi, đánh giá hiệu suất sử dụng tài nguyên hệ thống mạng lưới để có các cảnh báo điều chỉnh quy hoạch, đầu tư kịp thời.
       - Quản lý cơ sở dữ liệu: Chủ trì đánh giá nhu cầu và lập đề xuất tạo mới, thay đổi và hủy cơ sở dữ liệu (CSDL) mạng lõi. Thực hiện cập nhật và đối soát thông tin trên CSDL định kỳ để đảm bảo tính chính xác của dữ liệu. `},
       {style: 'textBoldItalic', text: '4.2. Đầu tư mua sắm'},
       { text: `- Đầu tư mua sắm các hạng mục thiết bị Internet (BRAS, OLT, Switch, DSLAM), Truyền hình (HeadEnd, SubHeadEnd), cáp quang và phụ kiện: Xây dựng các chỉ tiêu kỹ thuật, chấm thầu thiết bị, phối hợp với Phòng Mua sắm TCT và Phòng Đầu tư Tập đoàn hoàn thiện các hợp đồng mua sắm. Theo dõi, đôn đốc tiến độ hàng về của các dự án sau khi đã đầu tư. 
       - Hỗ trợ KCS hàng hóa thiết bị internet và truyền hình và đánh giá các nhà cung cấp thiết bị (vendor).`},
       {style: 'textBoldItalic', text: '4.3. Thiết kế'},
       { text: `- Xây dựng quy trình, hướng dẫn khảo sát, thiết kế, thi công lắp đựt, nghiệm thu các node mạng Cố định Băng rộng áp dụng cho các thị trường. 
       - Nghiên cứu công nghệ, đề xuất cách làm mới, các công cụ, phần mềm, cơ sở dữ liệu phục vụ cho công tác thiết kế mạng ngoại vi. 
       - Đối với thị trường xúc tiến đầu tư có nhu cầu triển khai CĐBR: Tham gia khảo sát, đánh giá thị trường, tham mưu, tư vấn cho Ban Tổng Giám Đốc về chiến lược, công nghệ và lộ trình đầu tư mạng lưới CĐBR phù hợp. 
       - Đối với thị trường mới đã có giấy phép và triển khai kinh doanh dịch vụ CĐBR: Chủ trì khảo thiết, thiết kế chi tiết 100% node mạng (Gồm cả HLD và LLD) bàn giao cho công ty thị trường. 
       - Đối với thị trường đã kinh doanh dịch vụ CĐBR: Trực tiếp hoặc hỗ trợ theo yêu cầu thiết kế các node mạng ngoại vi mới. `},
        {style: 'textBoldItalic', text: '4.4. Triển khai, thi công node mạng mới '},
        {text: `- Đối với thị trường mới đã có giấy phép và triển khai kinh doanh dịch vụ CĐBR: Trực tiếp tham gia triển khai, thi công, giám sát đảm bảo tác quyền thiết kế và điều chỉnh kịp thời các bất cập phát sinh trong quá trình thi công cho phù hợp với điều kiện thị trường. 
        - Đối với thị trường đã kinh doanh dịch vụ CĐBR: Tập trung vào công tác hậu kiểm theo Guideline, hướng dẫn. Chỉ tham gia triển khai, giám sát khi có yêu cầu hỗ trợ từ thị trường. `},
        {style: 'textBoldItalic', text: '4.5. Giám sát thiết kế và hiệu quả sử dụng tài nguyên mạng CĐBR: '},
        {text: `- Giám sát hiệu quả sử dụng tài nguyên dịch vụ cố định băng rộng, từ đó tư vấn kế hoạch đầu tư mua sắm, dồn dịch, tái sử dụng tài nguyên hiệu quả. 
        - Giám sát, phân tích chất lượng hạ tầng mạng theo thiết kế để tìm ra các tồn tại (nếu có) từ đó cải thiện thiết kế áp dụng cho cả các thị trường cũ và mới.  
        - Nghiên cứu, thử nghiệm, triển khai các giải pháp thiết kế mới nhằm tối ưu chi phí và nâng cao chất lượng mạng.`},
        {style: 'textBold', text: '5. Phòng Quy hoạch Thiết kế Cơ điện '},
        {style: 'textBoldItalic', text: '5.1.  Quy hoạch định cỡ các hệ thống Cơ điện cho các thị trường'},
        {text: `- Đối với thị trường đang khai thác: Thẩm định và phê duyệt quy hoạch định cỡ tổng thể 1-2 lần/năm. 
        - Quản lý hiệu suất sử dụng tài nguyên hệ thống cơ điện: Theo dõi, giám sáthiệu suất sử dụng tài nguyên thiết bị và đề xuất các giải pháp để nâng cao hiệu suất sử dụng tài nguyên các thiết bị mạng. 
        - Nghiên cứu, đề xuất triển khai áp dụng các công nghệ mới, các giải pháp mới nhằm tối ưu và nâng cao độ khả dụng cho hệ thống cơ điện các thị trường. 
        - Chủ trì xây dựng các quy trình/guideline/hướng dẫn liên quan. `},
        {style: 'textBoldItalic', text: '5.2. Đầu tư mua sắm '},
        {text: `- Ban hành Chỉ tiêu kỹ thuật phục vụ mua sắm. 
        - Chấm hồ sơ kỹ thuật, đàm phán và hoàn thiện các phụ lục kỹ thuật. 
        - Hỗ trợ công tác KCS hàng hóa thiết bị cơ điện. 
        - Theo dõi, đôn đốc, đảm bảo tiến độ cung cấp hàng hóa cho thị trường. 
        - Phối hợp xử lý các vấn đề phát sinh trong quá trình mua sắm hàng hóa. 
        - Đánh giá các nhà cung cấp thiết bị (vendor). `},
        {style: 'textBoldItalic', text: '5.3. Thiết kế'},
        {text: `- Thị trường đang hoạt động:  
         Đưa ra định hướng, thẩm định thiết kế hàng năm khi bổ sung thiết bị mới tại tổng trạm. 
         Chủ trì thiết kế chi tiết cho tổng trạm mới. 
         Hướng dẫn các thị trường thực hiện thiết kế cho các hệ thống access. 
        - Thị trường xúc tiến đầu tư: Tham gia khảo sát đánh giá thị trường đang xúc tiến đầu tư. 
        - Thị trường mới (đã có giấy phép): Chủ trì xây dựng thiết kế chi tiết 100% node mạng và bàn giao cho công ty thị trường triển khai, hỗ trợ thị trường điều chỉnh thiết kế cho phù hợp điều kiện triển khai thực tế. `},
        {style: 'textBoldItalic', text: '5.4. Nghiên cứu giải pháp, công nghệ mới lĩnh vực nguồn cho hệ thống viễn thông.'},
        { text: `- Nghiên cứu cập nhật công nghệ, giải pháp mới trong lĩnh vực nguồn viễn thông. 
        - Chủ trì phối hợp cùng các đơn vị tổ chức thử nghiệm, đánh giá, báo cáo và đề xuất triển khai.`},
        {style: 'textBold', text: '6. Phòng Quy hoạch Thiết kế Công nghệ Thông tin. '},
        {style: 'textBoldItalic', text: '6.1. Quy hoạch định cỡ '},
        {text:`- Chủ trì lựa chọn công nghệ/giải pháp, kiến trúc mạng và HLD; đánh giá hiệu quả đầu tư; hướng dẫn quy hoạch phân bổ thiết bị sau đầu tư. 
        - Thẩm định và phê duyệt quy hoạch định cỡ tổng thể cho các thị trường: 
         Với thị trường đang hoạt động: Thực hiện QHĐC dài hạn (2 năm trở lên), hàng năm và đột xuất khi có thay đổi lớn trong mạng lưới giữa chu kỳ QHĐC. 
         Với thị trường mới: QHĐC cho giai đoạn 2 năm đầu triển khai. Sau đó thực hiện như thị trường đang hoạt động. 
        - Với thị trường đang xúc tiến đầu tư: Chủ trì thực hiện tính toán QHĐC theo từng dự án. `},
        {style: 'textBoldItalic', text: '6.2. Đầu tư mua sắm '},
        { text: `- Ban hành Chỉ tiêu kỹ thuật phục vụ mua sắm cho các thị trường 
        - Chấm hồ sơ kỹ thuật, đàm phán và hoàn thiện các phụ lục kỹ thuật.
        - Hỗ trợ công tác KCS hàng hóa thiết bị server, thiết bị lưu trữ, thiết bị mạng 
        - Theo dõi, đôn đốc, đảm bảo tiến độ cung cấp hàng hóa cho thị trường. 
        - Phối hợp xử lý các vấn đề phát sinh trong quá trình mua sắm hàng hóa. 
        - Đánh giá các nhà cung cấp thiết bị (vendor).  
        `},
        {style: 'textBoldItalic', text: '6.3. Thiết kế '},
        {text: `- Thẩm định và phê duyệt thiết kế HLD đến LLD để đưa vào triển khai theo dự án; kiểm soát các thay đổi lớn đối với việc thay đổi trong quá trình triển khai và VHKT. 
        - Với thị trường đang hoạt động: Thực hiện toàn bộ HLD; thực hiện LLD với các hệ thống mới và làm mẫu với các hệ thống mở rộng. Các điều chỉnh thiết kế trong quá trình khai thác và SXKD giao cho thị trường thực hiện theo hướng dẫn/guideline,  
        - Thẩm định và phê duyệt các bản thiết kế chi tiết (high/low level design) cho các hệ thống CNTT. 
         Với thị trường mới: Chịu trách nhiệm thực hiện toàn bộ thiết kế LLD và các thay đổi trong quá trình triển khai.   
         Với thị trường đang xúc tiến đầu tư: Thiết kế HLD phục vụ lập dự án. `},
        {style: 'textBoldItalic', text: '6.4. Triển khai dự án (bộ máy SETUP)'},
        {text: `- Đối với thị trường mới: Chủ trì việc triển khai đảm bảo hệ thống cho toàn bộ mạng lưới và tích hợp với các hệ thống mạng truyền dẫn, mạng lõi và cung cấp hạ tầng đảm bảo cho nhóm xây dựng phần mềm tích hợp. 
        - Đối với thị trường cũ: Thực hiện chủ trì tích hợp các thiết bị vào trong mạng lưới và bàn giao cho đầu mối của thị trường để khai thác. `},
        {style: 'textBoldItalic', text: '6.5. Xây dựng công cụ và hỗ trợ khai thác công cụ '},
        { text: `- Xây dựng các công cụ phần mềm để tự động hóa các công việc của các đơn vị trong trung tâm
         - Hỗ trợ đảm bảo hạ tầng cho các công cụ của các đơn vị trong trung tâm (hạ tầng thiết bị cho phần mêm thiết kế vô tuyến Atoll) 
        - Chủ trì đảm bảo công tác An toàn thông tin, hỗ trợ máy tính trong toàn trung tâm`},
        {style: 'textBold', text: '7. Phòng Thiết kế Hạ tầng (TKHT)'},
        {style: 'textBoldItalic', text: '7.1. Thiết kế '},
        {text: '- Thẩm định và phê duyệt các bản thiết kế tổng thể 1-2 lần/năm cho các hạng mục thiết kế bản vẽ thi công nhà trạm, thiết kế bản vẽ thi công cơ điện, thiết kế bản vẽ thi công các tuyến truyền dẫn '},
        {style: 'textBoldItalic', text: '7.2. Đầu tư mua sắm '},
        { text: `- Ban hành Chỉ tiêu kỹ thuật phục vụ mua sắm cho hệ thống nhà trạm, cột và phụ kiện. 
        - Chấm hồ sơ kỹ thuật, đàm phán và hoàn thiện các phụ lục kỹ thuật. 
        - Hỗ trợ công tác KCS hàng hóa thiết bị nhà trạm, cột và phụ kiện. 
        - Theo dõi, đôn đốc, đảm bảo tiến độ cung cấp hàng hóa cho thị trường. 
        - Phối hợp xử lý các vấn đề phát sinh trong quá trình mua sắm hàng hóa. 
        - Đánh giá các nhà cung cấp thiết bị (vendor).`},
        
//
//File: 5. Chuc nang nhiem vu Trung tam Phan mem.pdf
//

        {text: 'File: 5. Chuc nang nhiem vu Trung tam Phan mem.pdf - Bình', pageBreak: 'before',  style: 'subheader', color: 'red'},
       
        { style: 'textBoldCenter', text: 'PHỤ LỤC 04e\n' },
        { style: 'textBoldCenter', text: 'CHỨC NĂNG, NHIỆM VỤ TRUNG TÂM PHẦN MỀM\n\n' },
        { style: 'subheader', text: 'I.	Chức năng, nhiệm vụ của Trung tâm Phần mềm:' },
        {text:`         
        1.  Tin học hóa các hoạt động quản lý, kinh doanh, kỹ thuật xuyên suốt từ Tổng Công ty VTG đến các thị trường.
        2.  Sản xuất phần mềm: Thực hiện phân tích, thiết kế, outsource phát triển phần mềm (chỉ lập trình một số module phần mềm).
        3.  Triển khai các hệ thống bigdata phục vụ báo cáo, quản lý số liệu kinh doanh, kỹ thuật, quản lý.
        4.  Nghiên cứu công nghệ nền tảng mới áp dụng vào các sản phẩm phần mềm trang bị cho toàn VTG để hiện đại hóa hệ thống CNTT và giảm chi phí đầu tư (hệ quản trị CSDL, SAN storage ảo, hệ thống Midleware…)               
        `  },
        { style: 'subheader', text: 'II.  Chức năng, nhiệm vụ Phòng Công nghệ Phần mềm:' },
        {  text: `
        1.  Quản lý chất lượng phần mềm:
        -  Ban hành quy trình, quy định hoạt động phát triển phần mềm từ VTG tới các thị trường.
        -  Giám sát KPI chất lượng sản xuất phần mềm của TT Phần mềm VTG, và các trung tâm phần mềm trong Tập đoàn.
        -  Giám sát các kế hoạch triển khai hiện đại hóa hệ thống CNTT cho các thị trường.
        2.  Nghiên cứu ứng dụng công nghệ nền tảng:
        -  Nghiên cứu công nghệ nền tảng: Công nghệ ảo hóa (SAN Storage ảo, máy chủ ảo, mạng ảo), hệ quản trị cơ sở dữ liệu mới(in memory, no sql …), mục tiêu giảm giá thành đầu tư và tăng chất lượng phần mềm cho TCT VTG.
        -  Nghiên cứu công nghệ nền tảng phục vụ phát triển phần mềm: Nghiên cứu các công nghệ mới phục vụ cho hoạt động phát triển các sản phẩm của Trung tâm phần mềm.
        3.  Nghiên cứu ứng dụng Datamining vào hoạt động kinh doanh các thị trường. ` },
        
        { style: 'subheader', text: ' III. Chức năng, nhiệm vụ phòng Phần mềm:' },
        {  text: ` 
        1.	Phân tích thiết kế phần mềm để thực hiện Tin học hóa các hoạt động quản lý, kinh doanh, kỹ thuật xuyên suốt từ Tổng Công ty VTG đến các thị trường.
        2.  Phân tích, thiết kế các phần mềm, sản phẩm CNTT theo đơn đặt hàng của các Công ty thị trường.
        3.  Outsource hoạt động phát triển phần mềm theo các thiết kế.
        4.  Nâng cấp hệ thống BCCS 1.0 cho các thị trường.  `  },
       { style: 'subheader', text: ' IV. Chức năng, nhiệm vụ Phòng Triển khai Bigdata.' },
       {  text: `  1.	Triển khai hệ thống báo cáo số liệu tập trung(vBI).
       2.  Triển khai hệ thống chống thất thoát cước cho 10 thị trường(RA).
       3.  Triển khai hệ thống chống gian lận cho 10 thị trường(FM). ` },
//
// 6. Chuc nang nhiem vu Phong KT.pdf - Bình
//
       {text: 'File: 6. Chuc nang nhiem vu Phong KT.pdf - Bình', pageBreak: 'before', style: 'subheader', color: 'red'},

       {
        columns: [
          { alignment: 'center', text: 'TẬP ĐOÀN VIỄN THÔNG QUÂN ĐỘI' },
          { style: 'textBoldCenter', text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' }
        ]
      },
      {
        columns: [
          { style: 'textBoldUnderline', text: 'TỔNG CÔNG TY CP ĐẦU TƯ QUỐC TẾ VIETTEL' },
          { style: 'textBoldUnderline', text: 'Độc lập-Tựdo-Hạnh phúc\n\n' }
        ]
      },
      {
        columns: [
          { text: '' },
          { alignment: 'center', text: 'Ngày    tháng 06 năm 2017' }
        ]
      },
      {
        columns: [
          { alignment: 'center', text: 'Số: /TTr-VTG-TCNS' },
          { text: '' }
        ]
      },
      {
        columns: [
          { style: 'textBoldCenter', text: 'PHÊ DUYỆT' },
          { text: '' }
        ]
      },
      {
        columns: [
          { alignment: 'center', text: 'Ngày   tháng 06 năm 2017' },
          { text: '' }
        ]
      },
      {
        columns: [
          { style: 'textBoldCenter', text: 'TỔNG GIÁM ĐỐC\n\n\n\n' },
          { text: '' }
        ]
      },

      { style: 'textBoldCenter', text: 'TỜ TRÌNH' },
      { style: 'textBoldUnderline', text: 'Về việc kiện toàn mô hình tổ chức Tổng Công ty VTG.\n\n' },
      {
        columns: [
          { alignment: 'right', text: 'Kính gửi: ' },
          { alignment: 'left', text: '  Tổng Giám đốc. \n' }
        ]
      },
     
      { style: 'subheader', text: 'I.  Vấn đề trình:' },
      {style: 'subTitle', text: '1.	Thành lập Trung tâm Quy hoạch Thiết kế, Tổng Công ty VTG.' },
      {style: 'subTitle', text: '2.	Kiện toàn mô hình tổ chức, chức năng nhiệm vụ của một số đơn vị thuộc Tổng Công ty VTG phù hợp với thực tế.' },
      
      { style: 'subheader', text: 'II.  Các căn cứ:' },
      {style: 'subTitle', text: '1.	Văn bản số 2881/QĐ-VTQĐ-TCNL ngày 05/6/2017 về việc điều chuyển Trung tâm Thiết kế Toàn cầu từ trực thuộc Tập đoàn sang các đơn vị trực thuộc Tập đoàn đã được Tổng Giám đốc Tập đoàn phê duyệt.' },
      {style: 'subTitle', text: '2.	Kết luận số 167/KL-KH ngày 19/6/2017 của Tổng Giám đốc về việc kết luận kiện toàn mô hình tổ chức của Tổng Công ty VTG.' },
      {style: 'subTitle', text: '3.	Căn cứ một số nội dung định hướng chỉ đạo kiện toàn Trung tâm Kinh doanh của PTGĐ Nguyễn Việt Dũng.' },
      
      { style: 'subTitleBold', text: 'III. Nội dung đề xuất:' },
      { style: 'subTitleBold',  text: ' 1.  Thành lập Trung tâm Quy hoạch Thiết kế (QHTK):' },
      {style: 'subTitle',text: '1.1.Quan điểm:' },
      {text: '-	Trung tâm QHTK là đầu mối chủ trì, chịu trách nhiệm toàn diện về việc quản lý, quy hoạch, khảo sát thiết kế, hỗ trợ đầu tư mua sắm, quản lý giám sát tài nguyên mạng lưới tại các Công ty thị trường và khảo sát quy hoạch thiết kế mạng lưới thị trường mới.' },
      {text: ' -	Trung tâm QHTK chịu trách nhiệm hướng dẫn, đào tạo, xây dựng lực lượng ngành dọc và thẩm định quy hoạch tổng thể từng thị trường từ 1-2 lần trong một năm.' },
      {style: 'subTitle',text: '1.2.Tổ chức bộ máy:' },       
      {text: '-	Trung tâm QHTK do PTGĐ Tổng Công ty phụ trách quy hoạch thiết kế trực tiếp quản lý, điều hành.' },
      {text: '-	Tổ chức của Trung tâm gồm: Phòng QHTK Mạng lõi, Phòng QHTK Vô tuyến; Phòng QHTK Truyền dẫn, Phòng QHTK Cơ điện, Phòng QHTK Cố định Băng rộng, Phòng QHTK Công nghệ thông tin; Phòng Thiết kế Hạ tầng và Ban PM Dự án.' }, 
      {style: 'subTitle',text: ' 1.3.Chi tiết chức năng, nhiệm vụ các đơn vị Trung tâm QHTK: Phụ lục 03.' },
      {style: 'subTitleBold', text: ' 2.	Kiện toàn mô hình tổ chức Trung tâm Kinh doanh:' },
      {style: 'subTitle',text: ' 2.1.Quan điểm:' },
      {text: ' -	Xây dựng Trung tâm Kinh doanh Tổng Công ty VTG trở thành Trung tâm chỉ huy, điều hành hoạt động kinh doanh của Tổng Công ty VTG và các Công ty thị trường.' },
      {text: ' -	Xây dựng chuẩn hóa hệ thống guideline về kinh doanh; Đưa công cụ phần mềm vào quản lý để mornitor, cảnh báo sớm các hoạt động kinh doanh của các thị trường và Tổng Công ty VTG.' },
      {text: ' -	Tập trung tri thức, nguồn lực tốt nhất tại Trung tâm Kinh doanh để giải quyết các vấn đề khó của thị trường: Lập các chuyên đề, tập trung nguồn lực giải quyết dứt điểm cho thị trường.' },
     
      {style: 'subTitle',text: '  2.2.Các nội dung điều chỉnh:' },
      {text: ' -	Điều chuyển chức năng nhiệm vụ  BigData và Kênh phân phối từ Phòng Digital và Phòng Kênh phân phối cũ về Phòng Di động để tập trung nguồn lực cho dịch vụ di động.' },
      {text: ' -	Điều chỉnh và đổi tên phòng Quảng cáo &Truyền thông thuộc thuộc khối Quản lý chức năng thành phòng Quảng cáo Truyền thông & Digital thuộc Trung tâm Kinh doanh để tập trung thực hiện các nhiệm vụ liên quan tới quảng cáo, xây dựng thương hiệu, hình ảnh của VTG và các Công ty thị trường trên các kênh truyền thống và kênh digital. Nhiệm vụ truyền thông nội bộ (công tác tuyên huấn) hiện tại được điều chuyển về phòng Chính trị Tổng Công ty.' },
      {text: ' -	Đổi tên thành phòng Digital&Thương mại Điện tử thành phòng Dịch vụ Thanh toán Điện tử với chức năng nhiệm vụ chính tập trung phát triển dịch vụ  thanh toán điện tử (ví điện tử/emoney…) tại các Công ty thị trường để tạo sự đột phá cho hoạt động SXKD.' },
      
      {style: 'subTitleBold', text: ' 3.	Kiện toàn Trung tâm Phần Mềm, Tổng Công ty VTG:' },
      {style: 'subTitle',text: '  3.1.Quan điểm:' },
      {text: '   -  Trung tâm Phần Mềm Tổng Công ty VTG là đầu mối chủ trì, chịu trách nhiệm thực hiện các nhiệm vụ:' },
      {text: '   + Tin học hóa các hoạt động quản lý, kinh doanh, kỹ thuật xuyên suốt từ Tổng Công ty VTG đến các thị trường.' },
      {text: '   + Sản xuất phần mềm: Thực hiện phân tích, thiết kế, outsource phát triển phần mềm (chỉ lập trình một số module phần mềm).' },
      {text: '   + Triển khai các hệ thống bigdata phục vụ quản lý số liệu kinh doanh, kỹ thuật, quản lý.' },
      {text: '   + Nghiên cứu công nghệ nền tảng mới áp dụng vào các sản phẩm phần mềm trang bị cho toàn VTG để hiện đại hóa hệ thống CNTT và giảm chi phí đầu tư (hệ quản trị CSDL, SAN storage ảo, hệ thống Midleware…)' },
      {style: 'subTitle',text: ' 3.2.Tổ chức bộ máy:' },
      {text: ' -	Trung tâm Phần mềm do PTGĐ Tổng Công ty phụ trách kinh doanh chỉ đạo, điều hành.' },
      {text: ' -	Tổ chức bộ máy gồm 03 phòng: Phòng Công nghệ Phần mềm; Phòng Phần mềm; Phòng Triển khai Bigdata.' },
      {style: 'subTitle',text: '  3.3.Chi tiết chức năng, nhiệm vụ đơn vị Trung tâm Phần mềm: Phụ lục 04.' },
      
      {style: 'subTitleBold', text: ' 4.	Một số điều chỉnh khác:' },
      {style: 'subTitle',text: '  4.1.Sáp nhập Phòng Đào tạo với Phòng Tổ chức Nhân sự: Điều động nguyên trạng nhân sự, chức năng nhiệm vụ của phòng Đào tạo hiện tại về thuộc phòng Tổ chức nhân sự.' },
      {style: 'subTitle',text: '  4.2.Kiện toàn chức năng, nhiệm vụ phòng Kỹ thuật, Tổng Công ty:' },
      {text: ' -	Phòng Kỹ thuật là đầu mối chủ trì xây dựng, ban hành các KPIs về công tác kỹ thuật và CNTT; Cùng với Tổng Công ty VTNet quản lý, giám sát, hỗ trợ công tác khai thác vận hành mạng lưới tại các Công ty thị trường.' },
      {text: ' -	Phòng Kỹ thuật tổ chức theo từng nhóm chức năng và hoạt động theo mô hình G-S-M, tận dụng tối đa nguồn lực và tri thức kỹ thuật tới thị trường.' },
      {text: ' -	Chi tiết chức năng, nhiệm vụ phòng Kỹ thuật:  Phụ lục 05.' },
      
      {style: 'subTitleBold', text: ' 5.	Mô hình tổ chức tổng thể Tổng Công ty VTG:' },
      {style: 'subTitle', text: '  5.1.Mô hình tổ chức tổng thể Tổng Công ty VTG:	Phụ lục số 01.' },
      {style: 'subTitle', text: '   5.2.Danh sách đề xuất sắp xếp, điều động nhân sự:	Phụ lục số 02.' },
     
      

      ]


    this.pdfmake.addContent(this._content);
    this.pdfmake.configureStyles(this._styles);
  }
}
