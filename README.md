# steam-time-tracker

```
SELECT
  index1 AS steam_app_id,
  (MAX(double1) - MIN(double1)) AS playtime_diff
FROM STEAM_PLAYTIME_FOREVER
GROUP BY steam_app_id;
```
