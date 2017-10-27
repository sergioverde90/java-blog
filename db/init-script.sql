create table posts(
    id numeric(10) primary key,
    author varchar(50) not null,
    title varchar(100) not null,
    d_date date not null default now(),
    resume varchar(100),
    content text not null
);

insert into posts (id, author, title, d_date, resume, content) 
values(1, 'sergioverde90@gmail.com', 'First post!', now(), 'resume', '### Hi! \n > this is markdown!');