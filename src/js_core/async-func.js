// User Profile API

async function fn1() {
  let token;
  let user;

  try {
    token = await getToken();
    user = await getUser(token);
  } catch (e) {
    return null;
  }

  let [posts, friends] = await Promise.all([
    getPosts(user.id).catch(() => undefined), // в случае ошибки вернет Promise.resolve(undefined)
    getFriends(user.id).catch(() => undefined),
  ]);

  return {
    user,
    posts,
    friends
  }
}


// Dashboard Widgets
async function fn2 () {
  let [weather, news, stocks] = await Promise.all([
    getWeather().catch(() => null),
    getNews().catch(() => null),
    getStocks().catch(() => null),
  ]);

  return {
    weather,
    news,
    stocks
  }
}

// Parallel + Dependent Requests
async function fn3 () {
  let token

  try {
    token = await getToken();
  } catch {
    return null
  }

  let [user, avatar] = await Promise.all([
    getUser(token).catch(() => null),
    getAvatar(token).catch(() => undefined)
  ]);

  if (!user) {
    return null;
  }

  let settings = await getSettings(user.id).catch(() => undefined);

  return {
    user,
    avatar,
    settings
  }
}

// Upload Flow
async function fn4 () {
  let fileInfo

  try {
    fileInfo = await uploadFile(file);
  } catch {
    return null
  }

  let [save, _, preview] = await Promise.all([
    saveToDB(fileInfo).catch(() => null),
    sendNotification(fileInfo).catch(() => undefined),
    generatePreview(fileInfo).catch(() => undefined),
  ])

  if (save === null) {
    return null
  }

  return {
    fileInfo,
    preview
  }
}