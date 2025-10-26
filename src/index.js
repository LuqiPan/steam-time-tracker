const PoESteamAppID = 238960; // Path of Exile's Steam App ID

export default {
  async scheduled(controller, env, ctx) {
    try {
      const response = await fetch(
        `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${env.STEAM_API_KEY}&steamid=${env.STEAM_ID}&format=json`
      );
      const data = await response.json();
      const poe = data.response.games.find(
        (item) => item.appid === PoESteamAppID
      );
      console.log(
        "total play time at",
        new Date().toISOString(),
        poe.playtime_forever
      );

      env.STEAM_PLAYTIME_FOREVER.writeDataPoint({
        indexes: [env.STEAM_ID],
        blobs: [PoESteamAppID.toString()],
        doubles: [poe.playtime_forever],
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
