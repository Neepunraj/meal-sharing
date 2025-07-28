CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    accessToken TEXT,
    refreshToken Text,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

ALTER TABLE reservations
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_reservations_user
    FOREIGN KEY (user_id) REFERENCES User(id)
    ON DELETE SET NULL;


ALTER TABLE reviews
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_reviews_user
    FOREIGN KEY (user_id) REFERENCES User(id)
    ON DELETE SET NULL;

ALTER TABLE meal
ADD COLUMN imgUrl TEXT;

ALTER TABLE User
MODIFY COLUMN role ENUM('USER', 'SUPER_ADMIN') NOT NULL DEFAULT 'SUPER_ADMIN';

ALTER TABLE User
MODIFY COLUMN role ENUM('USER', 'ADMIN') NOT NULL;

select * from `user`


select * from `reservations`

ALTER TABLE reservations
DROP FOREIGN KEY reservations_ibfk_1;

ALTER TABLE reservations
ADD CONSTRAINT fk_reservations_meal
FOREIGN KEY (meal_id) REFERENCES meal(id)
ON DELETE CASCADE;


ALTER TABLE reservations
DROP COLUMN meal_id;

SELECT * from meal

select * from reservations


SELECT * from reviews

ALTER TABLE meal ADD COLUMN slug VARCHAR(100);


DESCRIBE reservations;

ALTER TABLE reservations
ADD COLUMN meal_id INT NOT NULL,
ADD FOREIGN KEY (meal_id) REFERENCES meal(id) ON DELETE CASCADE;


DESCRIBE meal

ALTER TABLE reservations
ADD COLUMN meal_id INT;
