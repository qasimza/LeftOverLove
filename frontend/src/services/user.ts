const userEndpoint = "http://172.20.14.164:5000/recipient";
const RestaurantEndpoint = "http://172.20.14.164:5000/supplier";
export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  profileB64: string;
}
export interface RestaurantUser extends User {
  streetaddress: string;
  city: string;
  state: string;
  zip: string;
  description: string;
}

const errorWrapper = (err: string) => {
  return new Error("Fetch failed: " + err);
};

export const isRestaurantUser = (obj: object): obj is RestaurantUser => {
  return "description" in obj;
};
export const isUser = (obj: object): obj is RestaurantUser => {
  return "name" in obj;
};

const endpoint = (
  obj: User | RestaurantUser | undefined,
  restaurant = false
): string => {
  if ((obj && isRestaurantUser(obj)) || restaurant) return RestaurantEndpoint;
  return userEndpoint;
};

export const getUser = async (
  id: string,
  restaurant: boolean
): Promise<User | RestaurantUser | Error> => {
  return fetch(
    endpoint(undefined, restaurant),
    {
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"_id": id})
    }
  )
    .then(async (res: Response) => {
      if (!res.ok) return errorWrapper(res.statusText);
      const user = await res.json();
      if (isRestaurantUser(user)) return user as User;
      return user as RestaurantUser;
    })
    .catch((err) => {
      return errorWrapper(err);
    });
};
export const PostUser = async (
  user: User | RestaurantUser
): Promise<boolean | Error> => {
  return fetch(endpoint(user), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(async (res: Response) => {
      if (!res.ok) return errorWrapper(res.statusText);
      return true;
    })
    .catch((err) => {
      return errorWrapper(err);
    });
};
export const PutUser = async (user: User): Promise<boolean | Error> => {
  return fetch(endpoint(user), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(async (res: Response) => {
      if (!res.ok) return errorWrapper(res.statusText);
      return true;
    })
    .catch((err) => {
      return errorWrapper(err);
    });
};
export const DeleteUser = async (
  id: string,
  restaurant: boolean
): Promise<boolean | Error> => {
  return fetch(
    endpoint(undefined, restaurant) +
      new URLSearchParams({
        id: id,
      })
  )
    .then(async (res: Response) => {
      if (!res.ok) return errorWrapper(res.statusText);
      return true;
    })
    .catch((err) => {
      return errorWrapper(err);
    });
};
