-- Inserting some massages
INSERT INTO massages
(name) VALUES
('Sweedish'),
('Deep Tissue'),
('Shiatsu'),
('Hot Stone'),
('Reflexology'),
('Thai'),
('Aroma Therapy'),
('Sports'),
('Back');

-- Inserting some masseuists
INSERT INTO masseuists
(name, img_url) VALUES
('Peter', '/images/peter.jpg'),
('Colin', '/images/colin.jpg'),
('Jason', '/images/jason.jpg');

-- Giving the masseuists some proficiencies
INSERT INTO proficiencies
(masseuist_id, massage_id) VALUES
(1, 2),  -- Peter knows Deep Tissue
(1, 4),  -- Peter knows Hot Stone
(2, 6),  -- Colin knows Thai..hmm
(2, 2),  -- Colin knows Deep Tissue
(3, 9);  -- Jason knows Back

