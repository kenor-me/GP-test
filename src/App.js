import { useEffect, useState } from 'react';
import './styles.css';
import { Preloader, Table } from './components';
import { getVegansBook } from './api';
import { getWhoEatPizza } from './functions/getWhoEatPizza';

export const App = () => {
  const [resultList, setResultList] = useState({
    totalPeople: null,
    eatPizza: null,
    dietBook: null,
    complete: false,
    pending: false,
    error: false,
  });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setResultList({
      totalPeople: null,
      eatPizza: null,
      dietBook: null,
      pending: true,
      error: false,
      complete: false,
    });
    if (localStorage.getItem('partyList')) {
      const isLocal = JSON.parse(localStorage.getItem('partyList'));
      setResultList({
        totalPeople: isLocal.totalPeople,
        eatPizza: isLocal.eatPizza,
        dietBook: isLocal.dietBook,
        pending: false,
        error: false,
        complete: true,
      });
    } else {
      fetch('https://gp-js-test.herokuapp.com/pizza')
        .then((response) => response.json())
        .then((data) => {
          const totalPeople = data.party;
          // Делаю setTimeout, т.к не видно прелоадер
          setTimeout(function () {
            const eatPizza = getWhoEatPizza(totalPeople);
            const bookNames = eatPizza.map((item) => item.name.split(' ').join('%20')).join(',');
            getVegansBook(bookNames)
              .then((responseDiet) => {
                setResultList({
                  totalPeople: data.party,
                  eatPizza: eatPizza,
                  dietBook: responseDiet.diet,
                  pending: false,
                  error: false,
                  complete: true,
                });
                setLoad(false);
              })
              .catch((error) => {
                console.log(error);
              });
          }, 1000);
        })
        .catch((error) => {
          setResultList({
            totalPeople: null,
            eatPizza: null,
            dietBook: null,
            pending: false,
            error: true,
            complete: true,
          });
          console.log(error);
        });
    }
  }, [load]);

  useEffect(() => {
    localStorage.setItem('partyList', JSON.stringify(resultList));
  }, [resultList]);

  return (
    <div>
      {resultList.pending && <Preloader />}
      {resultList.complete && <Table resultList={resultList} setLoad={setLoad} />}
    </div>
  );
};
