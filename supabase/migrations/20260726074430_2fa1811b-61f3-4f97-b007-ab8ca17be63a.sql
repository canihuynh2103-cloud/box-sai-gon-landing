-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin','editor');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "admin delete profile" ON public.profiles FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- new user -> profile, first user becomes admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)))
  ON CONFLICT (id) DO NOTHING;
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- CONTENT TABLES
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text DEFAULT '',
  cover_image text,
  category text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  seo_keywords text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text DEFAULT 'Boxes',
  image text,
  content text DEFAULT '',
  seo_title text,
  seo_description text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price text NOT NULL,
  unit text,
  note text,
  features text[] NOT NULL DEFAULT '{}',
  cta text DEFAULT 'Nhận Báo Giá',
  popular boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Khác',
  year text,
  location text,
  duration text,
  image text,
  description text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  content text NOT NULL,
  rating int NOT NULL DEFAULT 5,
  avatar text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  image text,
  cta_label text,
  cta_href text,
  position text NOT NULL DEFAULT 'hero',
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['posts','services','faqs','pricing_plans','projects','reviews','banners'] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "admin manage %1$s" ON public.%1$I FOR ALL TO authenticated USING (public.has_role(auth.uid(),''admin'')) WITH CHECK (public.has_role(auth.uid(),''admin''))', t);
    EXECUTE format('CREATE TRIGGER touch_%1$s BEFORE UPDATE ON public.%1$I FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at()', t);
  END LOOP;
END $$;

CREATE POLICY "public read posts" ON public.posts FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "public read services" ON public.services FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "public read faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "public read pricing" ON public.pricing_plans FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "public read projects" ON public.projects FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "public read reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "public read banners" ON public.banners FOR SELECT TO anon, authenticated USING (is_active);

-- SEED
INSERT INTO public.services (title, slug, description, icon, sort_order) VALUES
('Bốc Xếp Kho Hàng','boc-xep-kho-hang','Nhập - xuất kho, sắp xếp pallet, kiểm đếm hàng hóa theo ca linh hoạt.','Warehouse',1),
('Bốc Xếp Container','boc-xep-container','Rút ruột container, đóng hàng lên cont tại depot, cảng và kho riêng.','Container',2),
('Bốc Xếp Nhà Máy','boc-xep-nha-may','Di dời máy móc, nguyên vật liệu, thành phẩm trong khu công nghiệp.','Factory',3),
('Bốc Xếp Cảng','boc-xep-cang','Nhân công có thẻ ra vào cảng Cát Lái, Hiệp Phước, Tân Cảng.','Anchor',4),
('Bốc Xếp Sân Bay','boc-xep-san-bay','Xử lý hàng air cargo tại Tân Sơn Nhất, đúng quy trình an ninh.','Plane',5),
('Thuê Nhân Công','thue-nhan-cong','Cung ứng nhân công thời vụ theo ca, theo ngày, có giám sát đội.','Users',6),
('Đóng Gói Hàng Hóa','dong-goi-hang-hoa','Quấn màng PE, đóng thùng gỗ, chèn lót hàng dễ vỡ đạt chuẩn.','PackageCheck',7),
('Chuyển Kho','chuyen-kho','Trọn gói tháo dỡ, vận chuyển và sắp xếp lại kho mới đúng sơ đồ.','Boxes',8),
('Chuyển Văn Phòng','chuyen-van-phong','Chuyển bàn ghế, thiết bị IT, hồ sơ ngoài giờ để không gián đoạn.','Building2',9),
('Chuyển Nhà','chuyen-nha','Chuyển nhà trọn gói, bọc lót nội thất, lắp đặt lại tận nơi.','Home',10),
('Xếp Dỡ Hàng Hóa','xep-do-hang-hoa','Xếp dỡ xe tải, xe container, hàng rời và hàng bao kiện.','Forklift',11),
('Bốc Hàng Theo Giờ','boc-hang-theo-gio','Điều động nhanh trong 60 phút, tính phí minh bạch theo giờ.','Clock',12),
('Bốc Xếp Theo Tháng','boc-xep-theo-thang','Đội cố định trực tại kho, báo cáo sản lượng hàng tuần.','CalendarRange',13),
('Bốc Xếp Hợp Đồng','boc-xep-hop-dong','Hợp đồng dài hạn, xuất hóa đơn VAT, cam kết SLA rõ ràng.','FileSignature',14);

INSERT INTO public.projects (name, category, year, location, duration, description, sort_order) VALUES
('Chuyển kho tổng 6.000m² Unilever','Chuyển Kho','2024','KCN Vsip 1, Bình Dương','12 ngày','Huy động 45 nhân công chia 3 ca, di dời hơn 9.000 pallet hàng tiêu dùng sang kho mới.',1),
('Rút ruột 120 container tại Cát Lái','Container','2024','Cảng Cát Lái, TP. Thủ Đức','18 ngày','Đội 30 nhân công có thẻ ra vào cảng, trung bình 7 cont/ngày, tránh phí lưu cont.',2),
('Chuyển văn phòng 14 tầng Deutsches Haus','Văn Phòng','2023','Quận 1, TP.HCM','3 đêm','Thi công ngoài giờ từ 20h đến 5h sáng, di dời 320 bộ bàn ghế và hệ thống máy chủ.',3),
('Di dời dây chuyền sản xuất Samsung','Nhà Máy','2023','KCN Sóng Thần, Bình Dương','21 ngày','Tháo dỡ, đóng kiện gỗ và lắp đặt lại 14 cụm máy nặng, không xảy ra sự cố.',4),
('Chuyển nhà trọn gói khu Thảo Điền','Chuyển Nhà','2024','TP. Thủ Đức','2 ngày','Chuyển nội thất biệt thự 3 tầng gồm piano, tranh nghệ thuật, có bảo hiểm.',5),
('Đóng gói xuất khẩu 4.000 kiện hàng','Đóng Gói','2022','KCN Tân Bình, TP.HCM','10 ngày','Thùng carton 5 lớp, quấn màng PE, dán nhãn barcode theo tiêu chuẩn EU.',6),
('Xếp dỡ hàng rời cho Nestlé','Xếp Dỡ','2023','Kho Hiệp Phước, Nhà Bè','Theo tháng','Đội cố định 20 người, xếp dỡ 60 tấn nguyên liệu mỗi ngày, báo cáo hàng tuần.',7),
('Xử lý hàng air cargo Tân Sơn Nhất','Sân Bay','2024','Sân bay Tân Sơn Nhất, TP.HCM','6 tháng','Nhân công qua kiểm tra an ninh hàng không, build-up và break-down pallet hàng air.',8);

INSERT INTO public.reviews (name, role, content, rating, sort_order) VALUES
('Nguyễn Thanh Hải','Giám đốc Logistics, Công ty TNHH Vận Tải Đại Phát','Đội bốc xếp có mặt đúng giờ, làm việc rất nhanh và gọn. Chúng tôi thuê theo tháng gần 2 năm nay.',5,1),
('Trần Minh Quân','Chủ doanh nghiệp phân phối FMCG','Báo giá minh bạch, không phát sinh lắt nhắt. Hàng dễ vỡ được bọc lót cẩn thận.',5,2),
('Lê Thị Bích Ngọc','Quản lý sản xuất, nhà máy KCN Sóng Thần','Đợt di dời dây chuyền rất gấp, bên Bốc Xếp Sài Gòn huy động thêm người chỉ trong một buổi chiều.',5,3),
('Phạm Văn Cường','Trưởng kho, chuỗi siêu thị bán lẻ','Nhân công được đào tạo an toàn, làm ca đêm vẫn giữ tốc độ tốt.',5,4),
('Đặng Hoàng Nam','Giám đốc điều hành, công ty forwarder','Điều động rất nhanh, hợp đồng rõ ràng, xuất hóa đơn VAT đầy đủ.',5,5);

INSERT INTO public.pricing_plans (name, price, unit, note, features, cta, popular, sort_order) VALUES
('Theo Giờ','50.000 - 80.000','VNĐ/giờ/người','Tối thiểu 3 giờ',ARRAY['Điều động trong 60 phút','Tính phí theo giờ thực tế','Phù hợp việc phát sinh gấp','Có giám sát đội đi kèm','Trang bị bảo hộ đầy đủ'],'Đặt Nhân Công',false,1),
('Theo Ngày','400.000 - 600.000','VNĐ/ngày/người','Ca 8 giờ, tăng ca tính riêng',ARRAY['Đội hình cố định cả ngày','Miễn phí khảo sát trước','Hỗ trợ dụng cụ xe đẩy, dây ràng','Kiểm đếm và biên bản bàn giao','Ưu tiên khi đặt từ 5 người'],'Nhận Báo Giá',true,2),
('Theo Tháng','Liên hệ','Hợp đồng dài hạn','Chiết khấu theo sản lượng',ARRAY['Đội cố định trực tại kho','Báo cáo sản lượng hàng tuần','Xuất hóa đơn VAT','Cam kết SLA trong hợp đồng','Thay thế nhân sự trong 24h'],'Nhận Tư Vấn',false,3);

INSERT INTO public.faqs (question, answer, sort_order) VALUES
('Bốc Xếp Sài Gòn phục vụ những khu vực nào?','Toàn bộ 22 quận huyện TP.HCM và các tỉnh lân cận: Bình Dương, Đồng Nai, Long An, Bà Rịa - Vũng Tàu, Tây Ninh.',1),
('Bao lâu thì nhận được báo giá?','Yêu cầu đơn giản: báo giá qua điện thoại hoặc Zalo trong 15 phút. Công trình lớn: khảo sát trong ngày, báo giá chi tiết trong 24 giờ.',2),
('Có bảo hiểm hàng hóa không?','Có. Mọi đơn hàng đều có cam kết bồi thường theo biên bản bàn giao; hàng giá trị cao được mua bảo hiểm riêng.',3),
('Giá dịch vụ được tính như thế nào?','Theo số lượng nhân công, thời lượng, khối lượng và tính chất hàng hóa, khoảng cách và điều kiện mặt bằng. Chốt giá trước khi thi công.',4),
('Có làm ca đêm, ngày lễ không?','Có, nhận việc 24/7 kể cả ca đêm, Chủ Nhật và ngày lễ Tết. Phụ phí được thông báo rõ trong báo giá.',5),
('Quy trình làm việc gồm những bước nào?','Tiếp nhận yêu cầu, khảo sát và báo giá, điều động nhân công đúng giờ, nghiệm thu và ký biên bản bàn giao.',6),
('Có những phương thức thanh toán nào?','Tiền mặt, chuyển khoản, ví điện tử. Khách doanh nghiệp thanh toán theo kỳ và xuất hóa đơn VAT.',7),
('Nhân công có được đào tạo an toàn lao động không?','Toàn bộ nhân công đều qua huấn luyện an toàn lao động và được trang bị bảo hộ đầy đủ.',8);

INSERT INTO public.posts (title, slug, excerpt, content, category, status, published_at, seo_title, seo_description, sort_order) VALUES
('Quy trình nhập - xuất kho chuẩn 5 bước','quy-trinh-nhap-xuat-kho-chuan-5-buoc','Kiểm đếm hai lớp, dán nhãn vị trí và ký biên bản bàn giao ngay tại kho.','<p>Quy trình nhập - xuất kho chuẩn giúp giảm sai sót và rút ngắn thời gian xử lý hàng.</p>','Bốc Xếp Kho Hàng','published',now(),'Quy trình nhập xuất kho chuẩn 5 bước','Hướng dẫn quy trình nhập xuất kho chuẩn 5 bước cho doanh nghiệp tại TP.HCM.',1),
('Cách sắp xếp pallet tối ưu diện tích kho','cach-sap-xep-pallet-toi-uu-dien-tich-kho','Bố trí theo tần suất xuất hàng giúp rút ngắn 30% thời gian lấy hàng.','<p>Nguyên tắc bố trí pallet theo tần suất xuất hàng và nhóm hàng.</p>','Bốc Xếp Kho Hàng','published',now(),'Sắp xếp pallet tối ưu diện tích kho','Mẹo sắp xếp pallet tối ưu diện tích kho và tăng năng suất lấy hàng.',2),
('Rút ruột container: tránh phí lưu cont thế nào?','rut-ruot-container-tranh-phi-luu-cont','Lên kế hoạch nhân sự theo lịch tàu để giải phóng cont đúng hạn.','<p>Kế hoạch nhân sự theo lịch tàu là chìa khóa tránh phí lưu cont.</p>','Bốc Xếp Container','published',now(),'Rút ruột container tránh phí lưu cont','Cách tổ chức rút ruột container để tránh phí lưu cont, lưu bãi.',3),
('Checklist di dời máy móc trong nhà máy','checklist-di-doi-may-moc-trong-nha-may','Phối hợp kỹ sư, đóng kiện gỗ và nghiệm thu chạy thử sau lắp đặt.','<p>Checklist đầy đủ cho một đợt di dời máy móc an toàn.</p>','Bốc Xếp Nhà Máy','published',now(),'Checklist di dời máy móc nhà máy','Checklist di dời máy móc trong nhà máy an toàn, đúng tiến độ.',4),
('Tiêu chuẩn đóng gói hàng xuất khẩu EU','tieu-chuan-dong-goi-hang-xuat-khau-eu','Thùng carton 5 lớp, quấn màng PE và dán nhãn barcode đúng quy cách.','<p>Yêu cầu đóng gói hàng xuất khẩu đi thị trường EU.</p>','Đóng Gói Hàng Hóa','published',now(),'Tiêu chuẩn đóng gói hàng xuất khẩu EU','Tiêu chuẩn đóng gói hàng xuất khẩu EU cho doanh nghiệp Việt Nam.',5),
('Nên thuê nhân công theo giờ hay theo tháng?','nen-thue-nhan-cong-theo-gio-hay-theo-thang','So sánh chi phí và tính ổn định để chọn phương án phù hợp mùa cao điểm.','<p>So sánh hai hình thức thuê nhân công phổ biến nhất.</p>','Thuê Nhân Công','published',now(),'Thuê nhân công theo giờ hay theo tháng?','So sánh thuê nhân công bốc xếp theo giờ và theo tháng.',6);

INSERT INTO public.banners (title, subtitle, cta_label, cta_href, position, sort_order) VALUES
('Dịch Vụ Bốc Xếp Hàng Hóa Chuyên Nghiệp Tại TP.HCM','Hơn 10 năm kinh nghiệm, 100+ nhân công, điều động trong 60 phút, báo giá minh bạch.','Nhận Báo Giá Ngay','#lien-he','hero',1);
