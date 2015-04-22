/**
 * @module metaversant/services/_RatingsServiceTopicMixin
 * @author Sujay Pillai
 */
define(["dojo/_base/declare"], 
        function(declare) {
   
   return declare(null, {

      /**
       * This topic is used to request that a node should be rated (the details should be supplied
       * as the publication payload).
       * 
       * @instance
       * @type {string}
       * @default "MR_RATING_ADD"
       */
      addRatingTopic: "MR_RATING_ADD",
      
      /**
       * This topic is used to request a node should have a rating removed.
       * 
       * @instance
       * @type {string}
       * @default "MR_RATING_REMOVE"
       */
      removeRatingTopic: "MR_RATING_REMOVE",
      
      /**
       * This topic is used indicate that a document has been successfully rated
       * 
       * @instance
       * @type {string}
       * @default "MR_RATING_ADD_SUCCESS"
       */
      addRatingSuccessTopic: "MR_RATING_ADD_SUCCESS",
      
      /**
       * This topic is used to indicate that a document has successfully had a rating removed
       * 
       * @instance
       * @type {string}
       * @default "MR_RATING_REMOVE_SUCCESS"
       */
      removeRatingSuccessTopic: "MR_RATING_REMOVE_SUCCESS",
      
      /**
       * This topic is used to indicate that an attempt to rate a document failed.
       * 
       * @instance
       * @type {string}
       * @default "MR_RATING_ADD_FAILURE"
       */
      addRatingFailureTopic: "MR_RATING_ADD_FAILURE",
      
      /**
       * This topic is used to indicate that an attempt to remove the rating from a document failed.
       * 
       * @instance
       * @type {string}
       * @default "MR_RATING_REMOVE"
       */
      removeRatingFailureTopic: "MR_RATING_REMOVE_FAILURE"
   });
});