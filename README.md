# README

What (Todo List)

Who (Users)

Todo Table (Step - One,  Users - Many)
creator_user_id
body char(256)
done boolean
list_order int(10)

Steps Table (Todo - Many)
todo_id int(10)
body char(256)
done boolean
list_order int(10)

Todo<>User table  (Many to Many)
user_id int(10)
todo_id int(10)
permission int(1)

User (Todos - Many)
username char(50)


When (Google Calendars)
Where (Google Maps)

P2 - Tab for Margin "scratch notes" that's searchable
P2 - Google Task API integration
P2 - Labels (Eg. work, personal, food truck 1, business 2)

keep ui as simple as possible. make adding and removing task as easy as possible. (eg. swipe to remove task. just start writing to create task. no buttons to add or remove tasks. autocomplete as much as possible.)
swipe right once to gray out, swipe left to undo, swipe right again to archive.

limit characters? (180 chars).

Have expiratory date. Longer the task, less likely you'll do it.



This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
