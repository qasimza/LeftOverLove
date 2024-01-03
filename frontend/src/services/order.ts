const itemEndpoint = "http://172.20.14.164:5000/items";

type Item={
    title: string;
    description: string;
    quantity_remaining: number;
}

export const PostItem = async (
    user: Item
  ): Promise<boolean | Error> => {
    return fetch(endpoint(), {
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

export const getUser = async (
  id: string,
): Promise<Item | Error> => {
  return fetch(
    endpoint(),
    {
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"_id": id})
    }
  )
    .then(async (res: Response) => {
      if (!res.ok) return errorWrapper(res.statusText);
      const item = await res.json();
      return item as Item;
    })
    .catch((err) => {
      return errorWrapper(err);
    });
};

  const errorWrapper = (err: string) => {
    return new Error("Fetch failed: " + err);
  };

function endpoint(): string {
    return itemEndpoint;
}
