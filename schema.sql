/*Some of the Drafted Queries are Availble in this doc rest are in the code*/


CREATE TABLE users(

	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	first_name VARCHAR(255),
	full_name VARCHAR(255),
	admin INT,
	PRIMARY KEY (id)
);

CREATE TABLE task_types(
	id INT NOT NULL AUTO_INCREMENT,
	typeTitle VARCHAR(255),
	PRIMARY KEY (id)
);


CREATE TABLE task_preferences(
	type_id INT,
	user_id INT,
	preference INT,
	PRIMARY KEY(user_id, type_id),
	FOREIGN KEY (type_id) REFERENCES task_types(id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_availability(

	user_id INT,
	mon INT,
	tue INT,
	wed INT,
	thu INT,
	fri INT,
	sat INT,
	sun INT,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE task(

	id INT NOT NULL AUTO_INCREMENT,
	stat VARCHAR(10),
	title VARCHAR(255),
	info LONGTEXT,
	due_day VARCHAR(3),
	creator INT,
	PRIMARY KEY (id),
	FOREIGN KEY (creator) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE task_users(

	task_id INT,
	user_id INT,
	PRIMARY KEY (user_id, task_id),
	FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


/*Query Drafts*/

/*To get user,sample without hashing */
SELECT * FROM users WHERE username = ? && password = ?;

/*To get all tasks that are with the status todo */
SELECT * FROM users WHERE stat = "todo";


/*To get all tasks that are with the status doing */
SELECT * FROM task WHERE stat = "doing";


/*To get all tasks that are with the status done */
SELECT * FROM task WHERE stat = "done";

/*To get users assigned to a task */
SELECT * FROM task_users WHERE user_id = ? && task_id = ?;

/*To create a new task and add to table */
INSERT INTO task ( stat, title, info, due_day, creator) VALUES (?,?,?,?,?);

/*To delete a task through the ID */
DELETE FROM task WHERE id = "?";

/*Create User Testing Purpose */
INSERT INTO users  (username, password, email ) VALUES (?,?,?)

INSERT INTO tasktype (typeTitle) VALUES (?)




