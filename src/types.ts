export enum OfferType {
    ALL = `cities`,
    FAVORITES = `favorites`,
    NEARBY = `near`,
}

export enum SortType {
    POPULAR = `Popular`,
    PRICE_TO_HIGH = `Price: low to high`,
    PRICE_TO_LOW = `Price: high to low`,
    RATING = `Top rated first`,
}

export interface Offer {
    bedrooms: number,
    city: {
        location: {
            latitude: number,
            longitude: number,
            zoom: number,
            },
        name: string,
    },
    description: string,
    goods: string[],
    host: {
        avatar: string,
        id: number,
        isPro: boolean,
        name: string,
     },
    id: number,
    images: string[],
    isFavorite: boolean,
    isPremium: boolean,
    location: {
        latitude: number,
        longitude: number,
        zoom: number,
     },
    maxAdults: number,
    previewImage: string,
    price: number,
    rating: number,
    title: string,
    type: string,
}

export interface Review {
    comment: string,
    date: string,
    id: number,
    rating: number,
    user: {
        avatar: string,
        id: number,
        isPro: boolean,
        name: string,
    },
}
