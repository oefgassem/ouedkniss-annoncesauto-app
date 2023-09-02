import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query SearchQuery($q: String, $filter: SearchFilterInput, $mediaSize: MediaSize = MEDIUM) {
    search(q: $q, filter: $filter) {
      announcements {
        data {
          ...AnnouncementContent
          smallDescription {
            valueText
            __typename
          }
          noAdsense
          __typename
        }
        paginatorInfo {
          lastPage
          hasMorePages
          __typename
        }
        __typename
      }
      active {
        category {
          id
          name
          slug
          icon
          delivery
          deliveryType
          priceUnits
          children {
            id
            name
            slug
            icon
            __typename
          }
          specifications {
            isRequired
            specification {
              id
              codename
              label
              type
              class
              datasets {
                codename
                label
                __typename
              }
              dependsOn {
                id
                codename
                __typename
              }
              subSpecifications {
                id
                codename
                label
                type
                __typename
              }
              allSubSpecificationCodenames
              __typename
            }
            __typename
          }
          parentTree {
            id
            name
            slug
            icon
            children {
              id
              name
              slug
              icon
              __typename
            }
            __typename
          }
          parent {
            id
            name
            icon
            __typename
          }
          __typename
        }
        count
        __typename
      }
      suggested {
        category {
          id
          name
          slug
          icon
          __typename
        }
        count
        __typename
      }
      __typename
    }
  }

  fragment AnnouncementContent on Announcement {
    id
    title
    slug
    createdAt: refreshedAt
    isFromStore
    isCommentEnabled
    userReaction {
      isBookmarked
      isLiked
      __typename
    }
    hasDelivery
    deliveryType
    likeCount
    description
    status
    cities {
      id
      name
      slug
      region {
        id
        name
        slug
        __typename
      }
      __typename
    }
    store {
      id
      name
      slug
      imageUrl
      isOfficial
      isVerified
      __typename
    }
    user {
      id
      __typename
    }
    defaultMedia(size: $mediaSize) {
      mediaUrl
      mimeType
      thumbnail
      __typename
    }
    price
    pricePreview
    priceUnit
    oldPrice
    oldPricePreview
    priceType
    exchangeType
    category {
      id
      slug
      __typename
    }
    __typename
  }
`;
