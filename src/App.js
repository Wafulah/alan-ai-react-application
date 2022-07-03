import React, { useState,useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import wordsToNumbers from 'words-to-numbers';

const alanKey = '8440be3340be76296d1e466d2ee3aff32e956eca572e1d8b807a3e2338fdd0dc/stage';



const App = () => {
    const [newsArticles,setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();
   
    useEffect(() => {
     alanBtn({
        key: alanKey,
        
        onCommand: ({ command, articles, number }) => {
            if(command === "newHeadlines"){
                setNewsArticles(articles);
                setActiveArticle(-1);
                
            } else if(command === 'highlight'){
                setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);

            } else if(command === 'open'){
                  const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                  
                  const article = articles[parsedNumber - 1];

                  if(parsedNumber > 20){
                    alanBtn().playText("Please try again.");
                  } else if (article) {
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');

                  }
                  
                  
            }
           
        }
     })

    },[])

    
   
  return (
    <div>
    <div className={classes.logoContainer}>
     <img className={classes.alanLogo} src="https://miro.medium.com/max/600/1*CJyCnZVdr-EfgC27MAdFUQ.jpeg" alt="alan Logo"/>
   
    </div>
    
    <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    <div style={{ height: 60 }}></div>
    </div>
   
  );
}

export default App;