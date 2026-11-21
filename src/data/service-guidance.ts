export type ServiceSection = {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
};

type ServiceGuidance = {
  sections: ServiceSection[];
  pricing: { h2: string; paragraphs: string[] };
};

/** Operational decision guidance, not promised staffing, prices or completion times. */
export const SERVICE_GUIDANCE: Record<string, ServiceGuidance> = {
  "boc-xep-kho-hang": {
    sections: [
      {
        h2: "Bố trí nhân công theo lượng hàng nhập, xuất và cách vận hành kho",
        paragraphs: [
          "Không thể xác định số người chỉ từ diện tích kho. Một kho có hàng trên pallet và xe nâng sẵn sẽ tổ chức khác với kho phải dỡ từng thùng, kiểm mã rồi chia về nhiều vị trí. Cần biết lượng hàng của từng ca, trọng lượng kiện, quãng đường từ cửa nhận đến điểm đặt hàng và phần việc do nhân sự kho đảm nhiệm.",
          "Phương án nhân công nên tách rõ khâu nhận hàng, trung chuyển, xếp vào vị trí và kiểm đếm. Nếu kho thường bị dồn hàng ở cửa nhận, tăng người ở khâu xếp cuối chưa chắc giải quyết được; cần xem lại lối đi, thiết bị và khả năng tiếp nhận của khu lưu trữ. Số người được đề xuất sau khi đối chiếu những điều kiện này với giờ xe đến.",
        ],
      },
      {
        h2: "Chốt lịch ca và điểm bàn giao trước khi nhận hàng",
        paragraphs: [
          "Thời gian điều động đội và thời gian xử lý lô hàng là hai việc khác nhau. Lịch triển khai cần khớp với lịch xe, giờ mở kho, người được quyền nhận hàng và thời gian có thể sử dụng xe nâng. Yêu cầu gấp chỉ được xác nhận sau khi kiểm tra đội sẵn sàng và điều kiện tại kho.",
          "Khi nghiệm thu, nên đối chiếu phiếu nhập hoặc xuất, số kiện thực tế và các kiện đã tách do hư hỏng. Nếu công việc còn phải phân loại theo mã hàng hoặc kiểm kê, hãy ghi riêng hạng mục này trong yêu cầu để không hiểu nhầm bốc xếp là đã bao gồm toàn bộ nghiệp vụ kho.",
        ],
      },
      {
        h2: "Kho cần chuẩn bị gì trước ca bốc xếp?",
        paragraphs: ["Chuẩn bị đúng mặt bằng giúp đội bắt đầu công việc thay vì mất thời gian tìm vị trí đặt hàng."],
        bullets: [
          "Danh sách hàng nhập, xuất và quy tắc phân loại theo mã hoặc lô.",
          "Khu tập kết trống, vị trí pallet và lối di chuyển không bị chắn.",
          "Thông tin xe nâng, xe đẩy có sẵn và người được phép vận hành.",
          "Người phụ trách kiểm đếm, nội quy an toàn và giờ xe được vào kho.",
        ],
      },
      {
        h2: "Thông tin giúp báo giá đúng phạm vi ca kho",
        paragraphs: ["Gửi ảnh hàng và cửa nhận, số kiện hoặc số pallet, trọng lượng kiện, lịch xe cùng công việc cần làm sau khi dỡ. Nêu rõ bạn chỉ cần chuyển hàng đến điểm tập kết hay cần xếp đúng vị trí, kiểm đếm và quấn màng. Nếu chưa biết cần bao nhiêu người, hãy mô tả lượng hàng và hạn hoàn thành để đội tư vấn phương án thay vì tự chọn một số người."],
      },
    ],
    pricing: {
      h2: "Những hạng mục cần tách khi tính chi phí bốc xếp kho",
      paragraphs: [
        "Khối lượng nhập, xuất, cách đóng kiện, cự ly trung chuyển và yêu cầu phân loại quyết định phần nhân công. Ca lẻ, ca đều theo lịch và nhu cầu bổ sung vào cao điểm cần được so sánh theo phạm vi công việc thực tế, không chỉ theo đơn giá một giờ.",
        "Báo giá cần làm rõ xe nâng do bên nào bố trí, vật tư quấn màng có tính riêng không và thời gian chờ xe hoặc chờ phiếu hàng được xử lý ra sao. Khi lượng hàng khác dự kiến, hai bên xác nhận phần việc thay đổi trước khi tiếp tục.",
      ],
    },
  },
  "boc-xep-container": {
    sections: [
      {
        h2: "Một container cần bao nhiêu nhân công?",
        paragraphs: [
          "Kích cỡ container chưa đủ để chốt số người. Cần biết hàng rời hay đã lên pallet, số kiện, trọng lượng và kích thước từng kiện, điểm nhận hàng sau khi rút, xe nâng có sẵn hay không. Cùng một loại container, hàng phải phân loại về nhiều khu kho có cách bố trí khác với hàng sang thẳng xe tải.",
          "Đội trong lòng container, nhóm trung chuyển và nhóm tại điểm nhận phải phối hợp với nhau. Nếu khu tập kết đầy hoặc thiết bị nâng chưa sẵn sàng, tăng người trong container không giúp dòng hàng thông suốt. Khối lượng hàng, mặt bằng và hạn hoàn thành đều cần được xem xét khi đề xuất nhân sự; không lấy số người của một dự án khác áp cho lô hàng của bạn.",
        ],
      },
      {
        h2: "Thời gian rút hoặc đóng cont được xác định ra sao?",
        paragraphs: [
          "Lịch làm cần phân biệt thời điểm xe đến, lúc container đủ điều kiện mở cửa và giờ phải kết thúc để trả rỗng hoặc giao hàng. Thời gian thao tác còn phụ thuộc hàng đóng sát cửa, yêu cầu kiểm đếm, vị trí đặt pallet và việc chèn lót khi đóng hàng.",
          "Thông tin ngày miễn phí lưu container hoặc lưu bãi cần lấy từ hãng tàu, đơn vị vận tải và bãi liên quan. Đội bốc xếp có thể tổ chức theo lịch bạn cung cấp nhưng không tự xác định thời hạn miễn phí hay cam kết một thời gian hoàn thành khi chưa xem lô hàng. Container có hàng xô lệch, bao rách hoặc kiện không rõ trọng lượng cần đánh giá trước khi mở và dỡ.",
        ],
      },
      {
        h2: "Chuẩn bị hiện trường trước khi mở cửa container",
        paragraphs: ["Thống nhất trước nơi hàng sẽ đi đến để tránh rút ra rồi phải chuyển lại sang một vị trí khác."],
        bullets: [
          "Packing list hoặc danh sách số kiện, loại hàng và thông tin kiện nặng.",
          "Điểm tập kết, pallet, đường di chuyển và thiết bị nâng đã sẵn sàng.",
          "Địa chỉ đặt cont, vị trí xe đỗ và điều kiện ra vào kho hoặc bãi.",
          "Người xác nhận niêm phong, cho phép mở cửa và ký nhận hiện trạng hàng.",
        ],
      },
      {
        h2: "Gửi yêu cầu báo giá rút ruột hoặc đóng hàng",
        paragraphs: ["Cung cấp số container, kích cỡ, hình ảnh cách xếp hàng, trọng lượng kiện và yêu cầu rút ra kho, sang xe hay đóng xuất. Gửi kèm giờ xe đến, hạn bàn giao do bên vận tải xác nhận và điều kiện thiết bị tại điểm làm. Với kiện máy móc hoặc hàng quá khổ, cần ảnh điểm nâng và thông số từ chủ hàng để đánh giá phương án trước khi chốt báo giá."],
      },
    ],
    pricing: {
      h2: "Các yếu tố ảnh hưởng đến chi phí bốc xếp container",
      paragraphs: [
        "Báo giá phụ thuộc hình thức rút hay đóng, hàng rời hay pallet, khối lượng, yêu cầu phân loại và điều kiện sử dụng thiết bị. Làm tại kho riêng và làm trong bãi có thể khác nhau về thủ tục, vị trí container và thời gian chờ; không nên dùng một đơn giá chung cho mọi lô.",
        "Cần tách phần nhân công, nâng hạ nếu phải thu xếp, vật tư chèn lót và thời gian phát sinh được thỏa thuận. Phí hãng tàu, bãi hoặc vận tải không mặc nhiên nằm trong phí bốc xếp; xác nhận với bên thu phí và ghi rõ bên chịu trách nhiệm trước khi triển khai.",
      ],
    },
  },
  "boc-xep-nha-may": {
    sections: [
      {
        h2: "Phân biệt bốc xếp theo ca với di dời thiết bị",
        paragraphs: [
          "Bổ sung người chuyển nguyên vật liệu và di dời một máy sản xuất không phải cùng một công việc. Với hàng nhập, xuất theo ca, nhân công được bố trí theo lượng hàng và quãng đường trong xưởng. Với máy móc, phải xác định trọng lượng, điểm nâng, đường di chuyển và phần việc cần kỹ thuật chuyên môn trước khi lập đội.",
          "Thiết bị nặng không được xử lý chỉ bằng cách tăng số người khuân. Phương án có thể cần thiết bị nâng và người vận hành phù hợp, đồng thời phân công người cảnh giới và người chỉ huy thao tác. Bộ phận kỹ thuật nhà máy chịu trách nhiệm xác nhận tình trạng ngắt nguồn, tháo kết nối và điều kiện bàn giao máy cho đội di chuyển.",
        ],
      },
      {
        h2: "Lịch triển khai phải khớp với kế hoạch sản xuất",
        paragraphs: [
          "Thời gian thực hiện bao gồm chuẩn bị đường di chuyển, bàn giao thiết bị, đưa máy đến vị trí mới và nghiệm thu phần di dời. Chỉ thời gian vận hành lại dây chuyền do nhà máy hoặc nhà cung cấp thiết bị xác nhận; không coi việc đặt máy đúng vị trí là máy đã sẵn sàng sản xuất.",
          "Nếu chuyển theo giai đoạn, cần ghi rõ khu vực vẫn sản xuất, lối đi được sử dụng và khoảng thời gian được phép làm. Ca đêm hoặc ngày nghỉ chỉ phù hợp khi nhà máy có người phụ trách kỹ thuật, an toàn và nghiệm thu cùng tham gia.",
        ],
      },
      {
        h2: "Hồ sơ và mặt bằng cần chuẩn bị tại xưởng",
        paragraphs: ["Một kế hoạch di dời có thể phải điều chỉnh nếu thông số máy hoặc khả năng chịu tải của đường đi chưa rõ."],
        bullets: [
          "Danh sách thiết bị, thông số trọng lượng và điểm nâng từ tài liệu máy.",
          "Sơ đồ vị trí mới, kích thước cửa và các đoạn đường cần đi qua.",
          "Xác nhận ngắt nguồn và tháo kết nối do người có chuyên môn thực hiện.",
          "Nội quy KCN, danh sách người phụ trách kỹ thuật và khung giờ cho phép thi công.",
        ],
      },
      {
        h2: "Đề nghị khảo sát bốc xếp hoặc di dời nhà máy",
        paragraphs: ["Nêu rõ nhu cầu là chuyển nguyên vật liệu, đưa thành phẩm ra kho hay di dời máy móc. Gửi ảnh thiết bị, thông số, sơ đồ xưởng và ngày dự kiến dừng khu vực làm việc. Hãy tách phần tháo kết nối, cân chỉnh và chạy thử khỏi phần di chuyển để báo giá thể hiện đúng trách nhiệm của từng bên."],
      },
    ],
    pricing: {
      h2: "Chi phí nhà máy phụ thuộc vào phương án thi công",
      paragraphs: [
        "Với công việc theo ca, cần xem lượng nguyên vật liệu và thành phẩm, lịch sản xuất, tuyến di chuyển và thiết bị sẵn có. Với di dời máy, chi phí còn liên quan đến đường đi, nhu cầu nâng hạ, đóng kiện và việc phải chia nhiều đợt.",
        "Báo giá nên tách nhân công, thiết bị nâng, vật tư bảo vệ và hạng mục kỹ thuật nếu có đơn vị chuyên môn phối hợp. Không mặc định đã bao gồm cân chỉnh, đấu điện hoặc nghiệm thu vận hành chỉ vì gói dịch vụ có tên di dời nhà máy.",
      ],
    },
  },
  "boc-xep-cang": {
    sections: [
      {
        h2: "Xác định đúng phần việc tại cảng hoặc depot",
        paragraphs: [
          "Yêu cầu bốc xếp cần chỉ rõ khu vực và phần việc: sang xe, kiểm đếm hàng bao kiện, đảo hàng hoặc đóng, rút container tại điểm được phép. Thuê đội nhân công không thay thế dịch vụ khai thác cầu bến, thiết bị của cảng hay thủ tục hải quan do đơn vị có thẩm quyền thực hiện.",
          "Số người phụ thuộc hình thức hàng, vị trí lô, quãng đường trung chuyển và thiết bị được sử dụng tại khu vực. Hàng trên pallet, hàng bao phải chuyển rời và hàng nằm ở nhiều vị trí không thể dùng chung một định biên. Khả năng điều đội còn phụ thuộc điều kiện đăng ký và phê duyệt ra vào của cảng hoặc depot.",
        ],
      },
      {
        h2: "Tính cả thời gian thủ tục vào lịch lấy hàng",
        paragraphs: [
          "Đội sẵn sàng chưa có nghĩa hàng đã sẵn sàng để làm. Lô hàng cần có vị trí xác định, chứng từ và sự cho phép thao tác của đơn vị quản lý. Lịch triển khai nên được xác nhận cùng chủ hàng, tài xế và người phụ trách tại bãi trước khi điều nhân công.",
          "Vị trí hàng thay đổi, xe đến muộn hoặc bãi chưa giải phóng mặt bằng đều có thể làm gián đoạn ca. Thời gian hoàn thành được dự kiến theo điều kiện lô hàng cụ thể, không hứa một sản lượng mỗi ca khi chưa biết cách tổ chức tại hiện trường.",
        ],
      },
      {
        h2: "Thông tin cần chuẩn bị cho công việc trong bãi",
        paragraphs: ["Liên hệ đơn vị quản lý để xác nhận khu vực nào cho phép đội ngoài thực hiện trước khi đặt dịch vụ."],
        bullets: [
          "Tên cảng hoặc depot, vị trí hàng và người đầu mối tại bãi.",
          "Danh sách kiện, đặc điểm bao bì và thông tin hàng cần xử lý riêng.",
          "Yêu cầu hồ sơ ra vào, nội quy bảo hộ và thời gian được phép làm.",
          "Lịch xe, thiết bị được phép sử dụng và nơi bàn giao hàng sau thao tác.",
        ],
      },
      {
        h2: "Đặt đội bốc xếp theo lô tại cảng",
        paragraphs: ["Gửi loại hàng, lượng cần xử lý, tên bãi, phần việc được phép thực hiện và lịch lấy hàng đã xác nhận. Nếu cần sang xe, cho biết loại xe nhận và điểm đỗ; nếu cần đảo hàng, mô tả hàng đang ở đâu và phải sắp xếp lại theo quy tắc nào. Chưa đủ thông tin ra vào thì nên trao đổi phương án trước, chưa chốt giờ bắt đầu."],
      },
    ],
    pricing: {
      h2: "Làm rõ phí nhân công và phí do cảng, depot thu",
      paragraphs: [
        "Lượng hàng, cách đóng kiện, số vị trí làm việc và thời gian thao tác quyết định phần nhân công. Nhu cầu sang xe, chèn lót hoặc phân loại có thể làm thay đổi phạm vi so với chỉ xếp dỡ tại một điểm.",
        "Phí nâng hạ, sử dụng bãi, lưu hàng và các khoản của đơn vị khai thác cần được xác nhận riêng. Khi so sánh báo giá, kiểm tra phần nào đã bao gồm, ai bố trí thiết bị và cách xử lý thời gian chờ thủ tục, tránh cộng chung thành một khoản không rõ trách nhiệm.",
      ],
    },
  },
  "boc-xep-san-bay": {
    sections: [
      {
        h2: "Nhân công hỗ trợ hàng air cargo ở khu vực nào?",
        paragraphs: [
          "Dịch vụ tập trung vào xếp dỡ, sang xe, bảo vệ bao bì và chuẩn bị kiện tại kho hoặc điểm giao nhận ngoài khu vực hạn chế. Phần tiếp nhận hàng của nhà ga, soi chiếu, khai thác sân đỗ hay khu cách ly do đơn vị được phép thực hiện. Cần xác nhận ranh giới bàn giao với forwarder trước khi bố trí người.",
          "Số nhân công được đề xuất từ số kiện, trọng lượng, kích thước, yêu cầu phân loại theo lô và điều kiện xe đỗ. Hàng dễ vỡ hoặc phải đóng gói lại cần thời gian thao tác riêng. Đội hỗ trợ không tự xác nhận hàng đã đáp ứng mọi điều kiện chấp nhận của hãng bay chỉ vì kiện đã được bọc và dán nhãn.",
        ],
      },
      {
        h2: "Lập lịch theo giờ tiếp nhận hàng được xác nhận",
        paragraphs: [
          "Giờ phải bàn giao tại kho và giờ kết thúc tiếp nhận của nhà ga có thể khác nhau. Khách cần lấy mốc chính xác từ forwarder hoặc đơn vị tiếp nhận, rồi tính thêm phần chuẩn bị kiện, xếp lên xe và di chuyển. Không dùng giờ bay để thay cho hạn giao hàng.",
          "Hàng đến chưa đủ, sai nhãn hoặc bao bì cần xử lý lại có thể ảnh hưởng lịch giao. Khả năng nhận việc gấp được xác nhận theo vị trí hàng và tình trạng đội tại thời điểm liên hệ, không mặc định có người tới ngay khi gọi.",
        ],
      },
      {
        h2: "Chuẩn bị lô hàng trước khi đội đến kho sân bay",
        paragraphs: ["Nên đối chiếu thông tin lô với đơn vị giao nhận trước khi yêu cầu dán nhãn hoặc sắp xếp kiện."],
        bullets: [
          "Mã lô hoặc AWB khi đã có, số kiện và thông tin trọng lượng.",
          "Hướng dẫn bao bì, nhãn và vị trí bàn giao do bên tiếp nhận cung cấp.",
          "Danh sách hàng nhạy cảm, dễ vỡ hoặc hàng cần đơn vị chuyên môn đánh giá.",
          "Giờ hàng sẵn sàng, xe nhận, đầu mối forwarder và mốc hoàn thành tại kho.",
        ],
      },
      {
        h2: "Nhận báo giá xử lý hàng gần Tân Sơn Nhất",
        paragraphs: ["Cho biết bạn cần dỡ từ xe vào kho, đóng gói lại hay xếp hàng từ kho lên xe giao. Gửi ảnh kiện, số kiện, địa chỉ kho và yêu cầu của bên tiếp nhận. Với hàng đặc thù, mô tả rõ tính chất hàng để đánh giá phần việc có thể hỗ trợ, không chỉ gửi tổng trọng lượng của cả lô."],
      },
    ],
    pricing: {
      h2: "Tách chi phí hỗ trợ kho khỏi phí hàng không",
      paragraphs: [
        "Chi phí hỗ trợ phụ thuộc số kiện, yêu cầu bao bì, khâu cân hoặc dán nhãn được giao, quãng đường sang xe và khung giờ làm. Một lô cần phân loại hoặc đóng gói lại khác với lô đã sẵn sàng chỉ cần xếp lên xe.",
        "Cước hàng không, phí nhà ga, thủ tục giao nhận và dịch vụ của forwarder không tự động nằm trong phí nhân công. Thống nhất riêng vật tư bảo vệ kiện, thiết bị nếu cần và bên xác nhận đủ điều kiện bàn giao.",
      ],
    },
  },
  "thue-nhan-cong-boc-xep": {
    sections: [
      {
        h2: "Thuê người hỗ trợ hay giao cả hạng mục bốc xếp?",
        paragraphs: [
          "Thuê nhân công phù hợp khi bạn đã có người điều hành, mặt bằng và quy trình nhưng thiếu người thực hiện. Nếu cần một đầu mối khảo sát, thu xếp thiết bị, đóng gói và bàn giao trọn hạng mục, nên mô tả nhu cầu đó ngay từ đầu để lựa chọn gói công việc, không chỉ đặt số người.",
          "Định biên được xem xét theo thao tác cần làm, khối lượng của từng khung giờ, trọng lượng kiện và điều kiện thiết bị. Không có một số người phù hợp cho mọi kho hoặc xưởng. Nếu chưa có dữ liệu sản lượng, bạn có thể gửi lịch xe và ảnh hiện trường để trao đổi cách phân công trước khi xác nhận đội.",
        ],
      },
      {
        h2: "Chọn thuê theo giờ, theo ca hay theo tháng",
        paragraphs: [
          "Công việc phát sinh ở một khung giờ phù hợp với phương án theo giờ; lịch hàng lặp lại theo ca cần đội bám lịch; nhu cầu đều và lâu dài có thể xem xét đội theo tháng. Quyết định nên dựa vào lượng việc thực tế và trách nhiệm quản lý, không mặc định thuê dài hạn luôn rẻ hơn.",
          "Trước ngày bắt đầu, cần thống nhất ai hướng dẫn công việc, ai xác nhận giờ làm và cách báo khi lượng hàng thay đổi. Thời gian điều động hoặc bổ sung người phụ thuộc lịch đội và yêu cầu ra vào tại địa điểm, nên xác nhận cụ thể thay vì dựa vào một mốc chung.",
        ],
      },
      {
        h2: "Bàn giao công việc cho đội thuê ngoài",
        paragraphs: ["Người phụ trách tại hiện trường cần xác định những thao tác được phép làm và hạng mục phải chuyển cho người có chuyên môn."],
        bullets: [
          "Mô tả công việc trong ca, loại hàng và sản lượng dự kiến.",
          "Nội quy bảo hộ, khu vực thao tác và thiết bị bên bạn cung cấp.",
          "Đầu mối giao việc, chấm công, kiểm đếm và nghiệm thu.",
          "Lịch làm, yêu cầu thay đổi người và thủ tục đăng ký tại kho hoặc xưởng.",
        ],
      },
      {
        h2: "Chưa biết cần bao nhiêu người vẫn có thể yêu cầu tư vấn",
        paragraphs: ["Gửi lịch làm mong muốn, loại hàng, lượng của một ca và ảnh nơi làm. Nêu rõ nhân sự hiện có và phần việc họ đang đảm nhiệm để tránh tính trùng. Báo giá sẽ dựa trên đội cần bổ sung, thời hạn thuê và cách tổ chức tại hiện trường; không cần tự đoán số người chỉ để gửi yêu cầu."],
      },
    ],
    pricing: {
      h2: "So sánh phương án thuê trên cùng điều kiện làm việc",
      paragraphs: [
        "Số người, lịch ca, thời hạn thuê, tính chất hàng và yêu cầu giám sát ảnh hưởng chi phí. Cần làm rõ thuê nhân công có bao gồm đội trưởng hay không, thiết bị và vật tư do bên nào chuẩn bị, giờ chờ có được tính không.",
        "Với nhu cầu không đều, so sánh tổng chi phí cho lịch việc của bạn thay vì chỉ nhìn giá theo giờ hoặc theo tháng. Thời lượng thuê theo từng công việc, làm thêm và cách thanh toán cần được ghi trong đề xuất; không có mức thuê tối thiểu cố định.",
      ],
    },
  },
  "dong-goi-hang-hoa": {
    sections: [
      {
        h2: "Chọn quy cách đóng gói từ rủi ro của hàng",
        paragraphs: [
          "Đóng gói để lưu kho, đi xe đường bộ và giao hàng xuất khẩu có yêu cầu khác nhau. Cần biết hàng nhạy với va đập, ẩm, bụi hay lực đè, có được xếp chồng không và phương tiện sẽ nâng kiện bằng cách nào. Quấn màng giúp giữ khối hàng nhưng không thay thế lớp chống va đập hoặc kết cấu đỡ cho hàng dễ vỡ.",
          "Số người và dụng cụ phụ thuộc số kiện, kích thước, trọng lượng và việc phải đóng tại chỗ hay làm từng công đoạn. Với máy móc, cần xác định điểm đỡ và bộ phận dễ hỏng từ thông tin chủ hàng. Không lựa chọn kiện gỗ chỉ theo kích thước bên ngoài mà bỏ qua cách cố định hàng bên trong.",
        ],
      },
      {
        h2: "Thời gian đóng gói gồm chuẩn bị vật tư và thi công",
        paragraphs: [
          "Lịch hoàn thành cần tính thời gian chọn và chuẩn bị vật liệu, đo thực tế, đóng kiện, dán nhãn và đưa kiện ra vị trí giao. Kiện cần kết cấu riêng hoặc hàng chưa tập kết đầy đủ không nên chốt cùng tiến độ với việc quấn màng pallet sẵn có.",
          "Hàng xuất khẩu cần có quy cách từ forwarder, đơn vị vận chuyển hoặc khách nhận. Yêu cầu xử lý vật liệu gỗ và chứng từ liên quan phải được xác nhận với đơn vị đáp ứng điều kiện; dịch vụ đóng kiện không mặc nhiên bao gồm chứng nhận hoặc mọi thủ tục xuất khẩu.",
        ],
      },
      {
        h2: "Khách cần chuẩn bị gì để đóng kiện đúng hàng?",
        paragraphs: ["Tập kết theo từng lô và chỉ rõ mặt đặt, hướng nâng, bộ phận không được tì đè trước khi đội chọn vật liệu."],
        bullets: [
          "Ảnh hàng, kích thước thực tế, trọng lượng và số lượng kiện cần đóng.",
          "Tuyến vận chuyển, điểm nhận và hướng dẫn đóng gói nếu đã có.",
          "Thông tin hàng dễ vỡ, cần chống ẩm hoặc không được xếp chồng.",
          "Khu vực sạch để thi công, vị trí tập kết và thiết bị nâng kiện sau đóng.",
        ],
      },
      {
        h2: "Yêu cầu báo giá vật tư và nhân công đóng gói",
        paragraphs: ["Gửi hình từng loại hàng cùng số lượng, kích thước và mục đích vận chuyển. Cho biết cần carton, bọc bảo vệ, pallet hay kiện gỗ theo quy cách đã được xác nhận. Nếu cần bốc lên xe sau khi đóng, hãy ghi thêm hạng mục này để báo giá có điểm kết thúc rõ ràng, không chỉ bàn giao kiện tại chỗ."],
      },
    ],
    pricing: {
      h2: "Vật liệu, quy cách và công đóng gói ảnh hưởng giá thế nào?",
      paragraphs: [
        "Kích thước kiện sau đóng, loại vật tư, kết cấu bảo vệ và mức độ phải gia công tại chỗ quyết định chi phí. Hai kiện có cùng trọng lượng nhưng một kiện dễ vỡ và một kiện hàng đồng nhất có thể cần cách bảo vệ khác nhau.",
        "Đề xuất nên tách vật tư, nhân công và phần nâng chuyển nếu có. Trường hợp khách có sẵn vật liệu, cần kiểm tra mức phù hợp trước khi chốt cách làm; không coi vật tư rẻ hơn là phương án đáp ứng được yêu cầu bảo vệ hàng.",
      ],
    },
  },
  "chuyen-kho": {
    sections: [
      {
        h2: "Lập đội chuyển kho từ danh sách hàng và sơ đồ hai đầu",
        paragraphs: [
          "Nhân công cần được bố trí cho cả kho đi và kho nhận. Nếu chỉ dồn người bốc lên xe nhưng kho mới chưa có vị trí đặt hàng, xe có thể phải chờ và lô hàng phải chuyển lại. Số người được đề xuất theo lượng hàng, cách đóng kiện, thiết bị, cự ly từ xe đến vị trí và khả năng tiếp nhận của từng kho.",
          "Cần phân biệt chuyển hàng với tháo lắp kệ, di chuyển thiết bị và sắp xếp lại hệ thống lưu trữ. Các hạng mục này có trình tự và điều kiện riêng. Chuyển theo đợt cần một danh sách đủ rõ để hàng đang bán không bị đưa đi trước khi bộ phận vận hành chuẩn bị xong.",
        ],
      },
      {
        h2: "Giữ khả năng tìm hàng trong suốt quá trình chuyển",
        paragraphs: [
          "Lịch triển khai dựa trên ngày bàn giao mặt bằng, lịch nhập xuất và thời điểm kho mới có thể tiếp nhận. Có thể trao đổi phương án chia đợt, nhưng không mặc định mọi kho đều chuyển mà không gián đoạn; mức ngừng vận hành phải được thống nhất với người quản lý.",
          "Mỗi lô nên có nhãn điểm đi, vị trí đến và người xác nhận số lượng. Khi kết thúc đợt, đối chiếu hàng đã chuyển với danh sách nhận trước khi tiếp tục lô sau. Nếu chưa có sơ đồ kho mới hoặc vẫn đang lắp kệ, cần chốt khu tập kết tạm và trách nhiệm sắp xếp lại.",
        ],
      },
      {
        h2: "Chuẩn bị kho cũ và kho mới trước ngày chuyển",
        paragraphs: ["Việc chuẩn bị ở điểm nhận quan trọng như đóng gói tại điểm đi."],
        bullets: [
          "Danh sách hàng theo mã, lô hoặc khu vực và thứ tự ưu tiên chuyển.",
          "Sơ đồ vị trí kho mới, tình trạng kệ và diện tích tập kết trống.",
          "Giờ xe vào, đường xe đỗ, thiết bị nâng ở cả hai đầu.",
          "Người kiểm đếm, lịch xuất nhập cần giữ và danh sách hàng phải xử lý riêng.",
        ],
      },
      {
        h2: "Báo giá chuyển kho cần thông tin cả hai địa điểm",
        paragraphs: ["Gửi địa chỉ kho đi và kho đến, ảnh cửa, lối đi, kệ, danh sách hàng và hạn bàn giao mặt bằng. Cho biết có cần xe vận chuyển, tháo lắp kệ, đóng gói và định vị hàng tại kho mới hay chỉ cần nhân công. Với kho vẫn xuất hàng trong thời gian chuyển, nêu lịch vận hành để khảo sát phương án chia đợt."],
      },
    ],
    pricing: {
      h2: "Tách từng đầu việc trong chi phí chuyển kho",
      paragraphs: [
        "Bốc xếp hai đầu, xe vận chuyển, thiết bị nâng, vật tư đóng gói và tháo lắp kệ là những phần cần làm rõ. Khối lượng hàng, khoảng cách, số lần trung chuyển và điều kiện tiếp nhận ở kho mới ảnh hưởng cách bố trí đội và lịch xe.",
        "Phương án làm nhiều đợt có thể giúp giữ hoạt động nhưng cần tính phần điều phối và chuẩn bị lặp lại. Không so sánh gói chỉ đưa hàng tới cửa kho với gói đã bao gồm kiểm đếm và xếp vào từng vị trí; điểm bàn giao cuối cùng phải được ghi trong báo giá.",
      ],
    },
  },
  "chuyen-van-phong": {
    sections: [
      {
        h2: "Chia nhân công theo phòng ban và điều kiện tòa nhà",
        paragraphs: [
          "Số người cần phụ thuộc đồ nội thất phải tháo, lượng hồ sơ, thiết bị và đường di chuyển tại hai tòa nhà. Khả năng dùng thang hàng, vị trí xe đỗ và khoảng thời gian được phép thi công có thể giới hạn tiến độ dù đã có đủ nhân công.",
          "Nên tách nhóm đóng gói, vận chuyển và lắp lại đồ nội thất. Máy tính, server và thiết bị mạng được bảo vệ, đánh dấu theo vị trí; việc sao lưu dữ liệu, ngắt kết nối, cấu hình và kiểm tra hệ thống do bộ phận IT hoặc nhà cung cấp phụ trách. Nhân công vận chuyển không thay thế kỹ thuật IT.",
        ],
      },
      {
        h2: "Thống nhất tiến độ chuyển và thời điểm làm việc trở lại",
        paragraphs: [
          "Lịch chuyển cần được ban quản lý cả hai tòa nhà đồng ý trước. Làm cuối tuần hoặc ngoài giờ có thể phù hợp, nhưng cần kiểm tra giờ thang hàng, bảo vệ trực và người nhận bàn giao; không hứa văn phòng sẵn sàng ngay sáng hôm sau khi chưa khảo sát.",
          "Kết thúc phần vận chuyển là đồ đã tới đúng phòng và hạng mục lắp lại đã nghiệm thu. Thời điểm nhân viên làm việc bình thường còn phụ thuộc điện, mạng và bố trí chỗ ngồi. Nên có danh sách những việc phải hoàn tất trước khi mở văn phòng lại.",
        ],
      },
      {
        h2: "Chuẩn bị hồ sơ, thiết bị và đăng ký thi công",
        paragraphs: ["Đánh nhãn theo phòng ban và vị trí mới giúp hạn chế việc mở nhiều thùng chỉ để tìm một tài liệu."],
        bullets: [
          "Danh sách bàn ghế, tủ, thiết bị và những kết cấu cần tháo lắp.",
          "Nhãn thùng theo phòng ban; người nhận riêng cho hồ sơ nhạy cảm.",
          "Sơ đồ chỗ ngồi mới và kế hoạch sao lưu, ngắt hệ thống từ bộ phận IT.",
          "Giấy đăng ký chuyển, lịch thang hàng, chỗ đỗ xe và người mở cửa hai đầu.",
        ],
      },
      {
        h2: "Gửi yêu cầu chuyển văn phòng đúng hạng mục",
        paragraphs: ["Cung cấp ảnh nội thất, thiết bị, số tầng, điều kiện thang máy, địa chỉ hai đầu và khung giờ tòa nhà cho phép. Nêu phần nào cần đội đóng gói, phần nào nhân viên đã tự chuẩn bị. Hồ sơ bảo mật và thiết bị quan trọng cần có đầu mối bàn giao riêng để đưa vào phương án làm việc."],
      },
    ],
    pricing: {
      h2: "Yếu tố ảnh hưởng chi phí chuyển văn phòng",
      paragraphs: [
        "Khối lượng đồ, công tháo lắp, khoảng cách từ xe tới thang hàng và thời gian tòa nhà cho phép quyết định phương án. Đi bộ nhiều đoạn, phải chuyển bằng thang bộ hoặc làm tách các khung giờ đều cần được ghi nhận khi khảo sát.",
        "Báo giá cần phân biệt vật tư đóng gói, vận chuyển, tháo lắp nội thất và việc kỹ thuật do bên khác thực hiện. Phí tòa nhà, điều kiện đặt cọc hoặc sử dụng thang hàng nếu có phải lấy từ ban quản lý, không mặc định nằm trong gói nhân công.",
      ],
    },
  },
  "chuyen-nha": {
    sections: [
      {
        h2: "Chuyển trọn gói hay chỉ thuê người khuân đồ?",
        paragraphs: [
          "Nếu đã có xe và đồ được đóng sẵn, bạn có thể yêu cầu phần bốc xếp tại nhà đi, nhà đến hoặc cả hai. Nếu cần tháo nội thất, bọc đồ, vận chuyển và lắp lại, hãy liệt kê những hạng mục đó. Tên trọn gói không thay cho danh sách công việc được hai bên xác nhận.",
          "Số người được tính theo đồ cần di chuyển, trọng lượng và kích thước món lớn, tầng, thang máy và khoảng cách xe đỗ. Cầu thang hẹp hoặc đồ không lọt cửa cần khảo sát cách xử lý, không chỉ bổ sung thêm người. Hạng mục điện lạnh, đấu điện hoặc vật đặc biệt phải có phương án chuyên môn riêng.",
        ],
      },
      {
        h2: "Thời gian chuyển phụ thuộc điều kiện ở cả hai nhà",
        paragraphs: [
          "Ngoài quãng đường chạy xe, lịch cần tính khâu đóng gói, tháo đồ, chờ thang máy và lắp lại ở nhà mới. Chung cư có giờ chuyển đồ hoặc phải đăng ký thang hàng thì nên chốt lịch với ban quản lý trước khi đặt đội.",
          "Nếu nhà chưa đóng đồ, hãy gửi ảnh hiện trạng để đánh giá có cần chuẩn bị trước hay không. Ngày cuối tuần hoặc thời điểm nhiều người chuyển nhà cần xác nhận đội sẵn sàng, không cam kết một mốc đến hoặc xong cố định khi chưa biết khối lượng.",
        ],
      },
      {
        h2: "Những việc gia đình nên chuẩn bị trước khi chuyển",
        paragraphs: ["Tách các món không giao cho đội vận chuyển ngay từ đầu để tránh phải tìm lại khi đồ đã lên xe."],
        bullets: [
          "Giấy tờ, tiền, đồ quý và vật dụng cần dùng ngay để riêng và tự quản lý.",
          "Ảnh tủ, giường, đồ lớn cùng kích thước cửa hoặc cầu thang chật.",
          "Nhãn thùng theo phòng ở nhà mới và danh sách đồ cần tháo lắp.",
          "Lịch thang máy, vị trí đỗ xe và người nhận đồ tại địa chỉ mới.",
        ],
      },
      {
        h2: "Nhận báo giá chuyển nhà qua mô tả và hình ảnh",
        paragraphs: ["Gửi ảnh đồ ở từng phòng, hai địa chỉ, tầng, tình trạng thang máy và ngày mong muốn. Cho biết bạn tự đóng phần nào, cần xe hay chỉ cần người bốc xếp. Với tủ không tháo được, đàn piano hoặc đồ giá trị cao, cần mô tả riêng để xem khả năng thực hiện và trách nhiệm bàn giao trước khi chốt."],
      },
    ],
    pricing: {
      h2: "Báo giá chuyển nhà cần ghi rõ những phần nào?",
      paragraphs: [
        "Lượng đồ, món nặng hoặc cồng kềnh, công tháo lắp, tầng, lối đi và khoảng cách quyết định phương án nhân công, xe và vật tư. Hai nhà cùng diện tích không đồng nghĩa có cùng khối lượng chuyển.",
        "Kiểm tra gói đã bao gồm bọc lót, thùng, xe, bốc xếp cả hai đầu và lắp lại những đồ nào. Phần điện lạnh hoặc thao tác chuyên môn cần thống nhất riêng. Nếu phát hiện thêm đồ hoặc điều kiện lối đi khác mô tả, trao đổi lại trước khi làm phần phát sinh.",
      ],
    },
  },
  "xep-do-hang-hoa": {
    sections: [
      {
        h2: "Bố trí người theo điểm lên, xuống hàng thay vì tải trọng xe",
        paragraphs: [
          "Tải trọng ghi trên xe không cho biết lượng hàng thực tế hoặc cách xử lý. Cần xác định số kiện, trọng lượng từng kiện, hàng nằm trên pallet hay xếp rời, có thể tiếp cận từ cửa sau hoặc bên hông và nơi đặt sau khi dỡ.",
          "Nhân công được tổ chức từ thùng xe qua khâu trung chuyển đến điểm giao. Thiết bị nâng, chiều cao sàn xe và khoảng cách vào kho ảnh hưởng cách chia nhóm. Kiện nặng phải đánh giá phương án nâng; không lấy tổng tấn hàng chia cho một năng suất tự ước lượng để chốt số người.",
        ],
      },
      {
        h2: "Phối hợp giờ xe tới và điều kiện điểm giao nhận",
        paragraphs: [
          "Ca xếp dỡ chỉ có thể bắt đầu khi xe được đỗ an toàn và nơi nhận sẵn sàng. Cần biết đường vào, khung giờ được dừng xe, người mở kho và thứ tự giao nếu xe có nhiều điểm. Đội nhận việc cần được thông báo khi lịch tài xế thay đổi.",
          "Thời gian xử lý còn phụ thuộc kiểm đếm, chia hàng theo khách nhận hoặc sắp xếp thứ tự trên thùng xe. Nếu chỉ chốt giờ hạ hàng nhưng bên nhận chưa có người ký hoặc chưa có chỗ đặt, lịch cả tuyến có thể bị ảnh hưởng; phần chờ này nên được thống nhất trước.",
        ],
      },
      {
        h2: "Chuẩn bị chỗ đỗ và nơi đặt hàng",
        paragraphs: ["Cần có tuyến di chuyển rõ từ xe đến điểm nhận, tránh bốc xuống rồi chặn lối đi chung."],
        bullets: [
          "Thông tin xe, giờ tới, cửa lấy hàng và người liên hệ của tài xế.",
          "Danh sách kiện, hàng dễ vỡ và món phải nâng bằng thiết bị.",
          "Chỗ đỗ phù hợp, đường đi trống và khu tập kết hoặc pallet nhận.",
          "Quy tắc xếp thứ tự giao hàng, kiểm đếm và đầu mối ký nhận.",
        ],
      },
      {
        h2: "Gửi thông tin để báo giá bốc lên hoặc hạ xuống xe",
        paragraphs: ["Nêu điểm đi, điểm nhận, loại hàng, số kiện, trọng lượng và ảnh cách xếp trên xe. Cho biết cần đưa đến cửa kho hay vào vị trí bên trong, có phải phân loại và chèn lót khi xếp lên không. Nếu xe nâng do bạn bố trí, ghi rõ thời điểm có thiết bị để phương án không dựa trên một điều kiện chưa sẵn sàng."],
      },
    ],
    pricing: {
      h2: "Chi phí xếp dỡ thay đổi theo cách giao hàng",
      paragraphs: [
        "Khối lượng thực tế, kiểu bao bì, quãng đường từ xe đến chỗ đặt và yêu cầu xếp lại ảnh hưởng chi phí. Hạ hàng xuống nền cạnh xe khác với đưa hàng vào nhiều khu hoặc lên tầng; yêu cầu ràng buộc khi xếp đi cần vật tư và thao tác riêng.",
        "Báo giá cần thể hiện phần nhân công, thiết bị hỗ trợ nếu có, vật tư và cách ghi nhận thời gian chờ. Hình thức theo chuyến, theo khối lượng hoặc theo giờ được thống nhất theo lô, không áp một mức tối thiểu chung khi chưa xác nhận điều kiện.",
      ],
    },
  },
  "boc-hang-theo-gio": {
    sections: [
      {
        h2: "Khi nào nên chọn bốc hàng theo giờ?",
        paragraphs: [
          "Phương án theo giờ phù hợp với công việc ngắn, có điểm bắt đầu và kết thúc rõ: dỡ một lô vừa đến, chuyển hàng giữa các vị trí hoặc hỗ trợ một phần ca. Với lượng việc lặp lại, nên so sánh với đội theo ca hoặc theo tháng trên lịch hàng thực tế, thay vì gọi lẻ cho mọi lần phát sinh.",
          "Khách có thể mô tả lượng hàng và thời gian mong muốn dù chưa biết số người. Đội tư vấn dựa trên kiện nặng nhẹ, khoảng cách, tầng hoặc lối đi và thiết bị hỗ trợ. Đặt ít người chưa chắc giảm tổng tiền nếu điểm trung chuyển bị nghẽn; đặt nhiều người cũng không hiệu quả khi nơi làm không đủ chỗ thao tác.",
        ],
      },
      {
        h2: "Thống nhất cách bắt đầu, kết thúc và xác nhận giờ làm",
        paragraphs: [
          "Trước khi điều đội, cần chốt giờ có mặt được xác nhận, thời điểm bắt đầu tính công, cách ghi nhận nghỉ hoặc chờ và người ký giờ. Tổng thời gian làm phụ thuộc khối lượng cùng điều kiện thực tế, không chỉ thời gian xe tới.",
          "Nếu công việc kéo dài, khách cần được trao đổi về phần còn lại và cách tính theo đề xuất đã thống nhất. Yêu cầu gấp chỉ được nhận sau khi xác nhận đội và đường vào; không hiểu nhận điện thoại 24/7 là luôn có người đến ngay.",
        ],
      },
      {
        h2: "Chuẩn bị để không mất giờ vào việc chờ",
        paragraphs: ["Một lượt thuê theo giờ hiệu quả cần hàng và điểm nhận cùng sẵn sàng khi đội đến."],
        bullets: [
          "Ảnh hàng, lượng cần chuyển và điểm đặt cuối cùng.",
          "Xe, chìa khóa kho hoặc người mở cửa tại giờ bắt đầu.",
          "Lối đi, xe đẩy hoặc xe nâng đã thống nhất trong phương án.",
          "Người giao việc và xác nhận phần phát sinh hoặc giờ kết thúc.",
        ],
      },
      {
        h2: "Đặt bốc hàng theo giờ không cần tự đoán số công",
        paragraphs: ["Gửi địa chỉ, ảnh lô hàng, số kiện, trọng lượng món nặng và khung giờ bạn cần làm. Mô tả điều kiện xe đỗ, tầng hoặc cầu thang và thiết bị có sẵn. Khi nhận báo giá, kiểm tra số người đề xuất, cách tính thời gian, phần việc được nhận và các khoản khác trước khi xác nhận lượt điều động."],
      },
    ],
    pricing: {
      h2: "Giá theo giờ cần đi kèm cách tính công rõ ràng",
      paragraphs: [
        "Tổng chi phí phụ thuộc số nhân công, thời gian được xác nhận và điều kiện công việc. Nhân công, xe vận chuyển, thiết bị nâng và vật tư không mặc nhiên là cùng một khoản; yêu cầu thêm phần nào cần ghi riêng phần đó.",
        "Khung giờ ngoài lịch thông thường, địa điểm xa hoặc công việc thay đổi cần trao đổi trong báo giá cụ thể. Không có mức thuê tối thiểu cố định; thời lượng cần thuê và cách xử lý giờ chờ được thống nhất theo việc trước khi đội bắt đầu.",
      ],
    },
  },
  "boc-xep-theo-thang": {
    sections: [
      {
        h2: "Định biên đội cố định từ lượng việc của từng ca",
        paragraphs: [
          "Đội theo tháng phù hợp với nơi có lịch nhập, xuất đều và cần nhân sự quen quy trình. Để xác định số người, cần xem lượng hàng theo ngày và ca, thời điểm cao điểm, phạm vi kiểm đếm hoặc đóng gói và phần thiết bị hỗ trợ. Không lấy ngày bận nhất làm mức cố định cho cả tháng nếu chưa phân tích lịch hàng.",
          "Nên thống nhất đội cơ bản và cách bổ sung khi phát sinh. Vai trò đội trưởng, người hướng dẫn quy trình và người xác nhận sản lượng phải rõ ngay từ đầu. Nhu cầu sử dụng thường xuyên là lý do xem xét phương án này, không phải một cam kết rằng giá mỗi giờ luôn thấp hơn mọi cách thuê khác.",
        ],
      },
      {
        h2: "Bắt đầu vận hành và đánh giá đội theo tháng",
        paragraphs: [
          "Trước ngày nhận ca cần chuẩn bị danh sách nhân sự, nội quy, tuyến di chuyển và cách chấm công. Đội phải làm quen cách phân loại, vị trí hàng và quy tắc báo sự cố của từng kho; không coi ngày đầu là đã đạt nhịp vận hành ổn định.",
          "Báo cáo nên phản ánh giờ làm, phần việc hoàn thành, hàng bất thường và thời gian chờ do điều kiện kho. Khi điều chỉnh số người, cần đối chiếu lý do thay đổi sản lượng với lịch xe và thiết bị, không chỉ tăng định biên vì ca vừa rồi hoàn thành chậm.",
        ],
      },
      {
        h2: "Chuẩn bị dữ liệu trước khi thuê đội theo tháng",
        paragraphs: ["Dữ liệu vận hành giúp trao đổi định biên và trách nhiệm cụ thể hơn một yêu cầu chỉ ghi cần đội cố định."],
        bullets: [
          "Lịch ca, ngày làm và lượng hàng thường gặp trong từng khung giờ.",
          "Danh sách thao tác nhân công phải đảm nhiệm, không gồm phần của nhân sự kho.",
          "Quy trình an toàn, quyền sử dụng thiết bị và yêu cầu hồ sơ ra vào.",
          "Đầu mối chấm công, báo cáo, phản hồi chất lượng và nhu cầu bổ sung cao điểm.",
        ],
      },
      {
        h2: "Thông tin để đề xuất đội bốc xếp dài ngày",
        paragraphs: ["Gửi lịch ca dự kiến, loại hàng, lượng nhập xuất và phạm vi cần giao cho đội. Nếu chưa có dữ liệu, mô tả những ngày ít hàng và những lúc thường bị dồn việc. Đề xuất cần thể hiện đội dự kiến, lịch bắt đầu, việc thay thế hoặc bổ sung nhân sự và kỳ đối chiếu để khách biết mình đang thuê năng lực nào."],
      },
    ],
    pricing: {
      h2: "Ngân sách theo tháng phải tính cả điều kiện vận hành",
      paragraphs: [
        "Định biên, số ca, lịch ngày nghỉ, phạm vi công việc và yêu cầu giám sát ảnh hưởng chi phí. Nếu kho có cao điểm, cần làm rõ phần đội cố định và phần bổ sung, thay vì để tổng ngân sách thay đổi mà không có căn cứ.",
        "Thống nhất cách tính làm thêm, ca thay đổi, nhân sự thay thế và đối chiếu công trong hợp đồng. So sánh các đề xuất trên cùng lịch và đầu việc; một gói bao gồm đội trưởng và báo cáo không tương đương gói chỉ cung cấp người làm theo sự điều hành của kho.",
      ],
    },
  },
  "boc-xep-hop-dong": {
    sections: [
      {
        h2: "Hợp đồng cần xác định kết quả hay chỉ số người?",
        paragraphs: [
          "Có thể thỏa thuận cung ứng nhân công theo lịch hoặc giao một phạm vi công việc có tiêu chí bàn giao. Hai cách này cần phân biệt: cung ứng người phải rõ ai điều hành và chấm công; giao hạng mục phải rõ sản lượng, điểm kết thúc và điều kiện cần phía khách chuẩn bị.",
          "Định biên được xây dựng từ lượng việc, địa điểm, lịch ca và thiết bị. Với nhiều điểm làm, cần xét khoảng cách và thời gian vận hành của từng nơi; không dùng một đội chung trên giấy nếu các ca diễn ra đồng thời. Nhu cầu kho lạnh hoặc hàng có rủi ro đặc thù phải được đánh giá trước khi nhận.",
        ],
      },
      {
        h2: "Chốt kế hoạch triển khai và tiêu chí đánh giá",
        paragraphs: [
          "Ngày bắt đầu phụ thuộc việc khảo sát, thống nhất phạm vi, chuẩn bị nhân sự và thủ tục tại địa điểm. Hợp đồng cần ghi cách thông báo lịch, người có quyền thay đổi công việc và quy trình khi có hàng hư hỏng hoặc ca không đủ điều kiện làm.",
          "SLA là tiêu chí dịch vụ hai bên thống nhất, không phải một con số có thể tự điền theo mẫu. Tiêu chí về quân số, phản hồi, sản lượng hoặc an toàn cần có cách đo, nguồn ghi nhận và điều kiện loại trừ rõ. Không cam kết năng suất hoặc mức bồi thường khi chưa đánh giá công việc và ký điều khoản.",
        ],
      },
      {
        h2: "Thông tin cần có trước khi soạn hợp đồng bốc xếp",
        paragraphs: ["Hồ sơ yêu cầu càng rõ thì báo giá và điều khoản trách nhiệm càng ít khoảng trống."],
        bullets: [
          "Danh sách địa điểm, lịch làm, loại hàng và khối lượng cần xử lý.",
          "Phạm vi nhân công, thiết bị, vật tư và nhiệm vụ của phía khách.",
          "Tiêu chí nghiệm thu, mẫu báo cáo và đầu mối xác nhận công việc.",
          "Yêu cầu an toàn, hồ sơ nhân sự, chứng từ và kỳ đối chiếu thanh toán.",
        ],
      },
      {
        h2: "Gửi yêu cầu báo giá và phương án hợp đồng",
        paragraphs: ["Cung cấp mô tả vận hành, lịch ca, địa điểm và phạm vi muốn thuê ngoài. Nếu có mẫu yêu cầu mua hàng hoặc tiêu chí đánh giá nhà cung cấp, gửi cùng để đề xuất bám đúng nhu cầu. Khi chưa chốt định biên, có thể trao đổi phương án khảo sát và cách đo khối lượng trước, thay vì ghi số người không có căn cứ vào hợp đồng."],
      },
    ],
    pricing: {
      h2: "Đọc báo giá hợp đồng theo phạm vi và trách nhiệm",
      paragraphs: [
        "Giá liên quan đến định biên, lịch làm, số địa điểm, thời hạn và trách nhiệm giám sát hoặc cung cấp thiết bị. Đề xuất cần làm rõ hạng mục thường xuyên, phần phát sinh và điều kiện thay đổi quy mô đội.",
        "Kiểm tra chứng từ nghiệm thu, chấm công, thời gian đối chiếu và cách xác nhận yêu cầu ngoài phạm vi. Điều khoản trách nhiệm khi hư hỏng hoặc gián đoạn phải được thống nhất riêng; không suy ra từ đơn giá thấp hoặc một lời cam kết chung trên website.",
      ],
    },
  },
};