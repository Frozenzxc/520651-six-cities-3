import {Review} from "../types";

export const reviews: Review[] = [
  {
    comment: `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`,
    date: `2020-02-23T08:36:26.433Z`,
    id: 1,
    rating: 4,
    user: {
      avatar: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/8.jpg`,
      id: 17,
      isPro: false,
      name: `Emely`
    }
  },
  {
    comment: `The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.`,
    date: `2020-02-23T08:36:26.433Z`,
    id: 2,
    rating: 3,
    user: {
      avatar: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/5.jpg`,
      id: 14,
      isPro: true,
      name: `Corey`
    }
  }
];
