import {useUnit} from "effector-react";
import articlesStore from "../store/ArticlesStore.ts";
import {useEffect} from "react";
import {notification} from "antd";

export const useFavoriteError = () => {
  const toggleFavoriteError = useUnit(articlesStore.toggleFavoriteError);

  useEffect(() => {
    if (toggleFavoriteError) {
      notification.error({message: toggleFavoriteError.message});
    }

    return () => {
      articlesStore.toggleFavoriteErrorDefaulted();
    };
  }, [toggleFavoriteError]);
};