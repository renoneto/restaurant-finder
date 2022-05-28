CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants (name, location, price_range)
VALUES ('McDonalds 2', 'New York', 3);

create table reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT not null references restaurants (id),
    user_name VARCHAR(50) NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5),
    review text not null,
    created_at TIMESTAMP NOT NULL DEFAULT timezone('utc', now())
);

insert into reviews (restaurant_id, user_name, rating, review)
values (1, 'Pedro', 2, 'Great water.');
