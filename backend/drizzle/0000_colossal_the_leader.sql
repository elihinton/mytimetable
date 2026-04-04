CREATE TABLE `short_share_url` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`expires_at` text DEFAULT (datetime('now', '+6 months'))
);
