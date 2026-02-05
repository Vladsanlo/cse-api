-- 1. LIMPIEZA DE TABLAS (Opcional, por si quieres resetear la DB)
DROP TABLE IF EXISTS romantic_interests;
DROP TABLE IF EXISTS character_enemies;
DROP TABLE IF EXISTS character_alliances;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS character_status;

---

-- 2. CREACIÓN DE TABLAS MAESTRAS
CREATE TABLE character_status (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    status VARCHAR(255) NOT NULL UNIQUE CHECK (status <> '')
);

CREATE TABLE characters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character_name VARCHAR(255) NOT NULL CHECK (character_name <> ''),
    status_id BIGINT REFERENCES character_status(id),
    times_dead INT NOT NULL DEFAULT 0,
    times_shroom_taken INT NOT NULL DEFAULT 0,
    pfp TEXT NOT NULL CHECK (pfp <> '') -- Usamos TEXT para URLs largas de hasta 2048+
);

---

-- 3. CREACIÓN DE TABLAS DE RELACIÓN (Many-to-Many)
-- Alianzas (Simétricas: A es amigo de B = B es amigo de A)
CREATE TABLE character_alliances (
    character_id_1 BIGINT REFERENCES characters(id) ON DELETE CASCADE,
    character_id_2 BIGINT REFERENCES characters(id) ON DELETE CASCADE,
    PRIMARY KEY (character_id_1, character_id_2),
    CONSTRAINT unique_alliance_pair CHECK (character_id_1 < character_id_2)
);

-- Enemigos (Simétricas)
CREATE TABLE character_enemies (
    character_id_1 BIGINT REFERENCES characters(id) ON DELETE CASCADE,
    character_id_2 BIGINT REFERENCES characters(id) ON DELETE CASCADE,
    PRIMARY KEY (character_id_1, character_id_2),
    CONSTRAINT unique_enemy_pair CHECK (character_id_1 < character_id_2)
);

-- Intereses Románticos (Pueden ser unidireccionales)
CREATE TABLE romantic_interests (
    follower_id BIGINT REFERENCES characters(id) ON DELETE CASCADE,
    followed_id BIGINT REFERENCES characters(id) ON DELETE CASCADE,
    is_mutual BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (follower_id, followed_id),
    CONSTRAINT self_love_check CHECK (follower_id <> followed_id)
);

---

-- 4. INSERCIÓN DE ESTADOS
INSERT INTO character_status (status) VALUES 
('Vivo'), 
('Viva'), 
('Vivo, en coma'), 
('Muerto'), 
('Muerta');

---

-- 5. INSERCIÓN DE PERSONAJES
-- Usamos subconsultas para obtener el ID del estado dinámicamente
INSERT INTO characters (character_name, status_id, times_dead, times_shroom_taken, pfp)
VALUES
('Marshall Cuso', (SELECT id FROM character_status WHERE status = 'Vivo'), 6, 6, 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/marshall_cuso.png'),
('Frances Applewhite', (SELECT id FROM character_status WHERE status = 'Viva'), 0, 1, 'https://static.tvtropes.org/pmwiki/pub/images/frances_applewhite.png'),
('Jonas Backstein', (SELECT id FROM character_status WHERE status = 'Vivo, en coma'), 0, 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ObdHG93t5GcSGGmG_9l0tuIM2YcHcbLCLw&s'),
('Agente Copano', (SELECT id FROM character_status WHERE status = 'Vivo'), 0, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAOL_q3qUsmrHJcaYG9faQLjCpVa5EKKld4A&s'),
('Agente Harrington', (SELECT id FROM character_status WHERE status = 'Vivo'), 0, 0, 'https://static1.srcdn.com/wordpress/wp-content/uploads/2025/03/common-side-effects-season-1-finale-9.jpg'),
('Hildy', (SELECT id FROM character_status WHERE status = 'Viva'), 1, 1, 'https://media.cdn.adultswim.com/uploads/20250131/thumbnails/2_251311454265-CommonSideEffects-103-Hildy-1920x1080.jpg'),
('Amelia', (SELECT id FROM character_status WHERE status = 'Viva'), 0, 0, 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2025/02/common-side-effects-episode-103.jpg'),
('Rick Kruger', (SELECT id FROM character_status WHERE status = 'Vivo'), 0, 0, 'https://media.tenor.com/6z8O3uQa3xgAAAAe/next-question-rick-kruger.png'),
('Policia Jimmer Jarvis', (SELECT id FROM character_status WHERE status = 'Vivo'), 0, 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy-qmgin_YJ11jOIocCoOE1V4HNFkZowqRGQ&s'),
('Rusty', (SELECT id FROM character_status WHERE status = 'Muerto'), 1, 0, 'https://static.wikia.nocookie.net/doblaje/images/4/41/Sobrino_de_Jimmer-EC.png/revision/latest?cb=20250217210801&path-prefix=es'),
('Nick', (SELECT id FROM character_status WHERE status = 'Vivo'), 0, 0, 'https://static.wikia.nocookie.net/doblaje/images/3/38/Nick-EC.png/revision/latest?cb=20250217204304&path-prefix=es'),
('Cecily', (SELECT id FROM character_status WHERE status = 'Viva'), 0, 0, 'https://static.wikia.nocookie.net/doblaje/images/6/65/Cecily-EC.png/revision/latest?cb=20250311003434&path-prefix=es'),
('Sadius', (SELECT id FROM character_status WHERE status = 'Vivo'), 0, 0, 'https://static.wikia.nocookie.net/doblaje/images/6/68/Sadius-EC.png/revision/latest?cb=20250217210343&path-prefix=es'),
('Linda Tree', (SELECT id FROM character_status WHERE status = 'Viva'), 0, 0, 'https://static.wikia.nocookie.net/doblaje/images/a/ae/Linda_Tree-EC.png/revision/latest?cb=20250328202401&path-prefix=es'),
('Sonia Applewhite', (SELECT id FROM character_status WHERE status = 'Muerta'), 1, 1, 'https://static.wikia.nocookie.net/doblaje/images/b/bb/Sonia_Applewhite-EC.png/revision/latest?cb=20250318004241&path-prefix=es'),
('Kenji', (SELECT id FROM character_status WHERE status = 'Vivo'), 0, 0, 'https://static.wikia.nocookie.net/doblaje/images/c/c4/Agente_hombre_2-EC.png/revision/latest?cb=20250311003538&path-prefix=es'),
('Kiki', (SELECT id FROM character_status WHERE status = 'Viva'), 0, 0, 'https://static.wikia.nocookie.net/doblaje/images/3/33/Kiki-EC.png/revision/latest?cb=20250311005030&path-prefix=es'),
('Hoang', (SELECT id FROM character_status WHERE status = 'Vivo'), 0, 0, 'https://static.wikia.nocookie.net/doblaje/images/5/5b/Hoang-EC.png/revision/latest?cb=20250311005017&path-prefix=es'),
('John Taylor', (SELECT id FROM character_status WHERE status = 'Vivo'), 1, 1, 'https://static.wikia.nocookie.net/doblaje/images/c/cf/John_Taylor2-EC.png/revision/latest?cb=20250328202447&path-prefix=es'),
('Zane', (SELECT id FROM character_status WHERE status = 'Vivo'), 0, 0, 'https://static.wikia.nocookie.net/doblaje/images/a/a4/Zane-EC.png/revision/latest?cb=20250215202345&path-prefix=es'),
('Agente hombre de la DEA', (SELECT id FROM character_status WHERE status = 'Muerto'), 1, 0, 'https://static.wikia.nocookie.net/doblaje/images/2/25/Agente_ep.6_2-EC.png/revision/latest?cb=20250311004957&path-prefix=es');

---

-- 6. INSERCIÓN DE RELACIONES EJEMPLO (Basado en alianzas del JSON)
-- Marshall (1) y Frances (2) son aliados y tienen interés romántico mutuo
INSERT INTO character_alliances (character_id_1, character_id_2) VALUES (1, 2);
INSERT INTO romantic_interests (follower_id, followed_id, is_mutual) VALUES (1, 2, TRUE), (2, 1, TRUE);

-- Harrington (5) y Amelia (7) interés romántico
INSERT INTO romantic_interests (follower_id, followed_id, is_mutual) VALUES (5, 7, TRUE), (7, 5, TRUE);