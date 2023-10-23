export function useIndexDb(storeName = 'BuyerProductEffectImgs') {
  const store = new IdbKvStore(storeName);
  const getItem = (key: string) => {
    return new Promise((resolve, reject) => {
      store
        .get(key)
        .then((value) => {
          resolve(value);
        })
        .catch((err) => reject(err));
    });
  };
  const removeItem = (key: string) => {
    return new Promise((resolve, reject) => {
      store
        .remove(key)
        .then((value) => {
          resolve(value);
        })
        .catch((err) => reject(err));
    });
  };
  const clear = () => {
    return new Promise((resolve, reject) => {
      store
        .clear()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => reject(err));
    });
  };
  const setItem = (key: string, value: string | number) => {
    return new Promise((resolve, reject) => {
      store
        .set(key, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
  const getLength = () => {
    return new Promise((resolve, reject) => {
      store
        .count()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => reject(err));
    });
  };
  const getKeys = () => {
    return new Promise((resolve, reject) => {
      store
        .keys()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => reject(err));
    });
  };
  const getAllKeysAndValues = () => {
    return new Promise((resolve, reject) => {
      store
        .json()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => reject(err));
    });
  };
  return {
    getItem,
    removeItem,
    clear,
    setItem,
    getLength,
    getKeys,
    getAllKeysAndValues,
  };
}
