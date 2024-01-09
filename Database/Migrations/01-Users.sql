create table if not exists `users`(
    `id` bigint unsigned not null unique primary key auto_increment  ,
    `name` varchar(42) not null ,
    `email` varchar(64) not null unique ,
    `password` varchar(40) not null
);