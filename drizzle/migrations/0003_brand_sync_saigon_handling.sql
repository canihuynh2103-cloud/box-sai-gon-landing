UPDATE public.posts SET
 title = replace(title,'Bốc Xếp Sài Gòn','Saigon Handling'),
 seo_title = replace(seo_title,'Bốc Xếp Sài Gòn','Saigon Handling'),
 og_title = replace(og_title,'Bốc Xếp Sài Gòn','Saigon Handling'),
 excerpt = replace(excerpt,'Bốc Xếp Sài Gòn','Saigon Handling'),
 seo_description = replace(seo_description,'Bốc Xếp Sài Gòn','Saigon Handling'),
 og_description = replace(og_description,'Bốc Xếp Sài Gòn','Saigon Handling'),
 content = replace(content,'Bốc Xếp Sài Gòn','Saigon Handling'),
 author = replace(author,'Bốc Xếp Sài Gòn','Saigon Handling')
WHERE concat_ws(' ',title,seo_title,og_title,excerpt,seo_description,og_description,content,author) LIKE '%Bốc Xếp Sài Gòn%';
UPDATE public.reviews SET content = replace(content,'Bốc Xếp Sài Gòn','Saigon Handling') WHERE content LIKE '%Bốc Xếp Sài Gòn%';