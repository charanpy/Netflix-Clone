export async function isNewUser(issuer, token) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'isNewUser',
    { issuer },
    token
  );

  return !!response?.data?.users?.length;
}

export async function createNewUser(email, issuer, publicAddress, token) {
  const operationsDoc = `
  mutation createNewUser($email: String!,$issuer: String!,$publicAddress: String!) {
    insert_users(objects: {email: $email,  issuer: $issuer, publicAddress: $publicAddress}) {
      affected_rows
      returning {
        email
        id
        issuer
      }
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    'createNewUser',
    { email, issuer, publicAddress },
    token
  );

  return response;
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationDoc = `
    query findVideoByUserId($userId: String!,$videoId:String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      userId
      videoId
      watched
    }
  }
  `;

  const response = await queryHasuraGQL(
    operationDoc,
    'findVideoByUserId',
    { userId, videoId },
    token
  );

  if (response?.errors) throw new Error();

  return response?.data?.stats;
}

export async function updateStats(
  token,
  { favourited, userId, watched, videoId }
) {
  const operationDoc = `
  mutation updateStats($favourited: Int!,$userId:String!,$watched:Boolean!, $videoId: String!){
    update_stats(
      where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}, 
      _set: {watched: $watched,favourited: $favourited}) {
        returning {
          favourited
          id
          userId
          videoId
          watched
        }
    }
  }`;
  const response = await queryHasuraGQL(
    operationDoc,
    'updateStats',
    { userId, videoId, watched, favourited },
    token
  );

  if (response?.errors) throw new Error();

  return response;
}

export async function insertStats(
  token,
  { favourited, userId, watched, videoId }
) {
  console.log(favourited, userId, watched, videoId);
  const operationDoc = `
  mutation insertStats($favourited: Int!,$userId:String!,$watched:Boolean!, $videoId: String!) {
    insert_stats_one(object: {favourited: $favourited, userId: $userId, videoId: $videoId, watched: $watched}) {
      favourited
      id
      userId
      videoId
      watched
    }
  }
`;
  const response = await queryHasuraGQL(
    operationDoc,
    'insertStats',
    { favourited, userId, watched, videoId },
    token
  );
  console.log(response?.errors);
  if (response?.errors) throw new Error();

  return response;
}

export async function queryHasuraGQL(
  operationDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
      // 'X-Hasura-Admin-Secret': process.env.NEXT_PUBLIC_HASURA_SECRET,
    },
    body: JSON.stringify({
      query: operationDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return result.json();
}
