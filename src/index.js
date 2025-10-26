export default {
  async scheduled(controller, env, ctx) {
    try {
      const response = await fetch(
        `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${env.STEAM_API_KEY}&steamid=${env.STEAM_ID}&format=json`
      );
      const data = await response.json();
      data.response.games.forEach((item) => {
        env.STEAM_PLAYTIME_FOREVER.writeDataPoint({
          indexes: [env.STEAM_ID],
          blobs: [item.appid.toString()],
          doubles: [item.playtime_forever],
        });
        console.log(item.appid, "total play time at", item.playtime_forever);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
