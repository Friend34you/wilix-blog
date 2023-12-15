import {Avatar, Button, Flex, Spin, Typography, notification} from "antd";
import type {FC, ReactNode} from "react";
import {useEffect, useMemo, useState} from "react";
import articlesStore from "../../store/articlesStore.ts";
import TagsList from "../TagsList.tsx";
import styled from "styled-components";
import {formatDate} from "../../helpers/formatDate.ts";
import {observer} from "mobx-react-lite";
import profilesStore from "../../store/profilesStore.ts";
import {Link, useLocation} from "react-router-dom";
import {Routes} from "../router/routes.tsx";
import {CheckOutlined, HeartOutlined, StarOutlined} from "@ant-design/icons";

const {Title, Paragraph, Text} = Typography;

type ArticleInteractionProps = {
  readonly createdAt: string,
  readonly updatedAt: string,
  readonly onFollowClick: () => void,
  readonly onFavoriteClick: () => void,
  readonly isFavorited: boolean,
  readonly isFollowed: boolean,
}

type ArticleAuthorProps = {
  readonly authorName: string,
  readonly profileImg?: string
}

type ButtonPropsType = {
  text: string,
  icon: ReactNode,
}

const TitleWrapper = styled.div`
  text-align: center;
  width: 100vw;
  padding: 20px 0;
  margin-bottom: 20px;
  background-image: linear-gradient(195deg,
  #ffa800 0,
  #ff9700 8.33%,
  #ff8400 16.67%,
  #ff6d00 25%,
  #ff551e 33.33%,
  #fe382c 41.67%,
  #e80d33 50%,
  #d00037 58.33%,
  #ba003b 66.67%,
  #a6003f 75%,
  #950043 83.33%,
  #860048 91.67%,
  #78004f 100%);

  & > h1 {
    color: white;
  }
`;

const StyledDateText = styled(Text)`
  font-size: 12px;
`;

const StyledHr = styled.hr`
  margin: 15px 0;
  width: 200px;
`;

const StyledParagraph = styled(Paragraph)`
  max-width: 1200px;
  min-width: 220px;
  font-size: 1rem;
  margin: 10px;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(34, 60, 80, 0.2);

  @media (max-width: 320px) {
    box-shadow: none;
    padding: 10px 5px;
  }
`;

const StyledArticleAuthorFlex = styled(Flex)`
  &:hover {
    transform: scale(1.1);
    transition: 0.2s linear;
  }
`;

const Article = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const article = articlesStore.currentArticle!;

  const {state: slug} = useLocation();

  useEffect(() => {
    setIsLoading(true);
    articlesStore
      .getOneArticle(slug)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error: Error) => notification.error({message: error.message}))
      .finally(() => setIsLoading(false));

    return () => {
      setIsSuccess(false);
      articlesStore.currentArticle = null;
      //добавл get и set в стор для зануления тут
      profilesStore.profile = null;
    };
  }, [slug]);

  function handleOnFavoriteClick() {
    articlesStore
      .toggleFavoriteArticle(slug)
      .catch((error: Error) => notification.error({message: error.message}));
  }

  function handleOnFollowClick() {
    profilesStore
      .toggleFollowUserProfile(article.author.username)
      .then(() => {
        //не понимаю, как сделать лучше,т.к. сторы никак не связаны
        article.author.following = profilesStore.profile!.following;
      })
      .catch((error: Error) => notification.error({message: error.message}));
  }

  return (
    <Flex
      align="center"
      vertical
    >
      {isLoading && (
        <Spin size="large"/>
      )}
      {isSuccess && (
        <>
          <TitleWrapper>
            <Title>
              {article.title}
            </Title>
          </TitleWrapper>

          <Flex
            align="center"
            gap="small"
            justify="space-evenly"
            wrap="wrap"
          >
            <ArticleAuthor
              authorName={article.author.username}
              profileImg={article.author.image}
            />
            <ArticleInteraction
              onFavoriteClick={handleOnFavoriteClick}
              onFollowClick={handleOnFollowClick}
              updatedAt={article.updatedAt}
              createdAt={article.createdAt}
              isFavorited={article.favorited}
              isFollowed={article.author.following}
            />
          </Flex>
          <StyledHr/>

          <StyledParagraph>
            Аннотация

            Длинные тексты (лонгриды), где большой объем сочетается с глубоким погружением в тему, становятся все более популярными в печатных и онлайновых изданиях, так как позволяют изданию выделиться из информационного шума. Цели исследования – выявить распространенность лонгридов в российских СМИ и содержательные и композиционные особенности этих текстов. Исследование включает мониторинг публикаций в центральных российских изданиях и последующий контент-анализ 10 материалов из 10 печатных и онлайновых изданий. Выводы исследования: лонгриды присутствуют в изданиях разных типов: от ежедневных газет − до нишевых новостных сайтов. Они посвящены, как правило, описанию нового явления; имеют объем от 2 до 4 тыс. слов и построены по композиционной схеме чередования примеров и обобщений.

            Ключевые слова: лонгрид, жанры, тренд, российская пресса.



            Abstract

            Long texts (longreads), where big size combines with in-depth reporting, are becoming increasingly popular in print and online media, because these texts enable the publication to stand out against the information noise. The aims of this research are to identify the popularity of longreads in the Russian media and their content and compositional particularities. The research includes the monitoring of Russian federal publications and subsequent content analysis of 10 articles issued in 10 print and online publications. The key findings of the research indicate that longreads can be found in publications of different types from daily newspapers to niche news sites. As a rule, the texts are devoted to a description of a new phenomenon, their normal size being 2−4 thousand words. The usual longread composition scheme is an alternation of examples and generalizations.

            Key words: longread, genres, trend, Russian press.



            Во все большем количестве российских изданий − как печатных, так и онлайновых − появляются объемные материалы особого типа, за которыми в журналистской среде закрепилось название «длинные тексты» (англ. – long forms) или лонгриды (от англ. − long read – материал, предназначенный для длительного прочтения, в отличие от маленькой заметки).

            Сразу же следует оговориться, что объем материала – хотя и наиболее заметная, но не ключевая характеристика лонгрида. Объемными могут быть и материалы других жанров, поэтому сам по себе большой объем текста вовсе не означает, что перед нами лонгрид. Как будет показано в исследовании, лонгриды отличает также особый подход к выбору темы, требования к качеству собранной информации и способ подачи материала.

            В исследовании предпринята попытка описать типологические характеристики лонгридов, разобрать особенности их подготовки, а также выявить распространенность лонгридов в современной российской прессе. Еще одной целью исследования является оценка перспектив этого жанра, о котором можно говорить если не как о сложившемся (в принятых на сегодняшний день в научной среде жанровых классификациях лонгрид отсутствует), то как о складывающемся и проникающем во все большее количество изданий.



            Лонгрид как жанр журналистских материалов

            В качестве жанрообразующих признаков журналистских текстов современные исследователи журналистики (А.А. Тертычный, Г.В. Лазутина, С.С. Распопова, О.Р. Самарцев1 и др.) называют предмет отображения, цель творчества, метод исследования материала, широту отображения действительности, выразительно-изобразительные средства, используемые автором, отношение автора к описываемому предмету, а также вид творчества, имеющий особенности и на уровне журналистского материала, и на уровне способа работы над ним.

            Объем текста в качестве жанрообразующего признака ни в одной из работ не упоминается. При этом подразумевается, что некоторые жанры (очерк, специальный репортаж, журналистское расследование) предполагают скорее объемные тексты, нежели короткие. Объем текста традиционно считается производным от количества и качества собранной журналистом информации с учетом формата издания и принятых в нем размеров материалов.

            Однако в современной журналистской практике объем текста все чаще используют как одну из жанровых характеристик. Так, главный редактор интернет-издания Lenta.ru, Г. Тимченко (на момент публикации интервью 22 апреля 2013 г.), комментируя ребрендинг издания, упоминала в том числе «длинные тексты», которыми издание «приросло»2. Что касается конкретных цифр, то в качестве пороговых значений, начиная с которых текст становится «длинным», обычно указывают 1,5−2 тыс. слов3.

            Необходимость публикации «длинных текстов», или лонгридов (в данной работе эти термины употребляются как синонимы), объясняется стремлением изданий выделиться из общего информационного потока, преодолеть царящий в Интернете информационный шум4. С помощью новостей это сделать проблематично, так как даже эксклюзивная новость, опубликованная одним изданием, уже спустя минуты появляется на других сайтах. В результате поставщик эксклюзива оказывается в проигрыше. Взяв на себя основную часть издержек по подготовке данной новости, он получает лишь малую часть внимания аудитории, привлеченной этим сообщением. Изменить данную ситуацию не представляется возможным, так как авторское право на содержание журналистской информации не распространяется, и та же самая новость в пересказе другими словами – это формально новое произведение.

            В случае же с лонгридом пересказ материала далеко не эквивалентен исходному тексту. Прочитан будет именно лонгрид, и именно на него, а не на дайджесты-перепечатки будут ссылаться в социальных сетях. По данным одного из зарубежных исследований5, девять из десяти наиболее цитируемых в социальных сетях публикаций газеты «Нью-Йорк Таймс» (The New York Times) – лонгриды, а самой цитируемой публикацией, собравшей только в социальной сети Facebook свыше 47 тыс. перепостов, оказался лонгрид объемом в 10,5 тыс. слов об индонезийских нелегальных иммигрантах, стремящихся попасть в Австралию6.

            И практикующие журналисты, и исследователи отмечают, что для привлечения внимания читателей в эпоху информационного изобилия и характерного для Интернета клипового восприятия лонгрид должен содержать уникальную и более яркую, более качественную информацию, чем обычно предлагается в СМИ. В англоязычной литературе это названо in-depth reporting7, что подразумевает значительное время и усилия журналиста, потраченные на исследование темы и − как результат − на ее новое понимание, недоступное при поверхностном ознакомлении с темой. Погружение же в тему позволяет затем передать это новое знание и новое понимание в тексте, что станет для читателя вознаграждением за время, потраченное на чтение лонгрида.

            Именно глубину погружения в тему, качество собранной информации следует считать главной жанровой характеристикой лонгрида. Журналист должен достичь экспертного понимания темы, что позволит ему заметить многие детали и сделать обоснованные выводы. Глубина погружения проявляется и в количестве источников информации, использованных при подготовке материала, и в количестве примеров, подтверждающих заявленный тренд, и в информативности текста, когда большой объем сочетается с высокой плотностью смысла.

            Другая жанровая характеристика лонгрида – особенность темы. Для лонгридов характерны темы, выходящие за рамки одного конкретного случая или ситуации и описывающие либо новое явление, тренд, значимое изменение в обществе (например, суррогатное материнство в современной России8), либо системное расследование происходящего в какой-то сфере (например, участие российских войск в войне на востоке Украины в июле − сентябре 2014 г.9).

            Иногда к жанровым характеристикам лонгрида относят мультимедийное сопровождение при подаче материала в Интернете. В этой связи некоторые исследователи, например И.В. Стечкин10, называют лонгридами именно мультимедийные проекты, когда видеозаписи и иллюстрации, в том числе анимированные и сопровождающиеся звуковым фоном, являются составной частью опубликованного в Интернете материала. Наиболее известные примеры подобных материалов – проект «Снегопад» (Snowfall)11 американской газеты «Нью-Йорк Таймс» о группе горнолыжников и сноубордистов, попавших под лавину в горах на северо-западе США, и проект российского ИД «Коммерсантъ» «Земля отчуждения»12 о последствиях аварии на Чернобыльской АЭС. В обоих проектах сделана попытка создать с помощью мультимедийных средств эффект присутствия: в первом случае при открытии материала на экране монитора появляется снег со звуком метели, во втором из динамиков начинает раздаваться характерный писк счетчиков Гейгера, указывающий на наличие радиации.

            Но, с точки зрения автора данного исследования, мультимедийная составляющая жанровой характеристикой лонгрида не является, так как с использованием мультимедийных средств можно подавать тексты любого жанра. Тем более, что облегчение восприятия текстовой информации с помощью иллюстративности в прессе и мультимедийности в Интернете – тренд последних 10−20 лет. При этом, если в содержательном плане материал ничем не выделяется, ожидать повышенного интереса к нему только благодаря использованию мультимедиа стоит едва ли. Даже при качественном и оригинальном мультимедийном сопровождении материала интерес может возникнуть именно к этому сопровождению, а не к тексту, и, в лучшем случае, будет «длительный просмотр», а  не «длительное прочтение».

            Поэтому к жанровым характеристикам лонгрида необходимо отнести то существенное, что отличает этот вид текстов от материалов других жанров. Это системность темы (новое явление, системное расследование), глубокое и длительное исследование темы журналистом с использованием большого количества источников информации и большой объем текста в сочетании с высокой плотностью смысла и претензией на исчерпанность данной темы, сложность развить тему дальше, чем это сделал  автор. Что же касается оформления материала, то, несмотря на то что лонгриды хоть и принято сопровождать большим количеством иллюстраций, чем материалы многих других жанров, в число жанрообразующих характеристик нецелесообразно включать иллюстративность и мультимедийность. Лонгрид останется лонгридом, даже если материал будет представлять собой  только текст  без иллюстраций.

            Что же касается соотнесенности лонгридов с другими жанрами, то тексты этого жанра следует отнести к группе аналитических жанров. Близким к лонгриду является жанр аналитической статьи: их объединяет глубокое проникновение в тему, представление в материале разных точек зрения и достижение читателем нового понимания предмета после прочтения текста. Однако аналитическая статья обычно строится по принципу научного исследования: гипотеза, аргументы за и против и уточненная с учетом этого гипотеза, которую можно считать истинным знанием. Лонгрид же предусматривает более наглядную подачу материала за счет использования примеров и репортажных вставок, которые не только облегчают восприятие (аналитическая статья пишется в большей мере для интеллектуальной элиты, лонгрид – для широкой аудитории), но и обогащают его. Как именно это делается, будет показано ниже.


          </StyledParagraph>

          <Flex>
            <TagsList tags={article.tagList}/>
          </Flex>
        </>
      )}
    </Flex>
  );
});

const ArticleAuthor:FC<ArticleAuthorProps> = ({authorName, profileImg}) => {
  return (
    <Link
      state={authorName}
      to={Routes.CURRENT_PROFILE + authorName}
    >
      <StyledArticleAuthorFlex
        align="center"
        gap="small"
      >
        <Avatar src={profileImg}>
          {authorName.charAt(0)}
        </Avatar>
        <Text>
          {authorName}
        </Text>
      </StyledArticleAuthorFlex>
    </Link>
  );
};

const ArticleInteraction:FC<ArticleInteractionProps> = ({
  createdAt,
  updatedAt,
  isFavorited,
  isFollowed,
  onFollowClick,
  onFavoriteClick,
}) => {

  const followButtonProps = useMemo<ButtonPropsType>(() => {
    if (isFollowed) {
      return {
        icon: <CheckOutlined/>,
        text: "followed"
      };
    }
    return {
      icon: <HeartOutlined/>,
      text: "follow"
    };
  }, [isFollowed]);

  const favoriteButtonProps = useMemo<ButtonPropsType>(() => {
    if (isFavorited) {
      return {
        icon: <CheckOutlined/>,
        text: "favorited",
      };
    }
    return {
      icon: <StarOutlined/>,
      text: "favorite",
    };
    },[isFavorited]);

    return (
      <>
        <Flex vertical>
          <StyledDateText>
            created: {formatDate(createdAt)}
          </StyledDateText>
          <StyledDateText>
            edited: {formatDate(updatedAt)}
          </StyledDateText>
        </Flex>

        <Button
          icon={followButtonProps.icon}
          type="primary"
          onClick={onFollowClick}
        >
          {followButtonProps.text}
        </Button>
        <Button
          icon={favoriteButtonProps.icon}
          onClick={onFavoriteClick}
        >
          {favoriteButtonProps.text}
        </Button>
      </>
    );
  };

  export default Article;