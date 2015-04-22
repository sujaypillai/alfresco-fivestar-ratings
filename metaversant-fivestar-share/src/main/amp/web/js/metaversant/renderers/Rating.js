/**
 * @module metaversant/renderers/Rating
 * @extends module:alfresco/renderers/Toggle
 * @mixes module:metaversant/services/_RatingsServiceTopicMixin
 * @mixes module:alfresco/renderers/_JsNodeMixin
 * @author Sujay Pillai
 */
define(["dojo/_base/declare",
        "alfresco/renderers/Toggle",
        "alfresco/services/_RatingsServiceTopicMixin",
        "alfresco/renderers/_JsNodeMixin",
        "dojo/text!./templates/Rating.html",
        "dojo/_base/lang",
        "dojo/html",
        "dojo/dom-class"], 
        function(declare, Toggle, _RatingsServiceTopicMixin, _JsNodeMixin, template, lang, html, domClass) {

   return declare([Toggle, _RatingsServiceTopicMixin, _JsNodeMixin], {
      
      /**
       * An array of the i18n files to use with this widget.
       * 
       * @instance
       * @type {{i18nFile: string}[]}
       * @default [{i18nFile: "./i18n/Like.properties"}]
       */
      i18nRequirements: [{i18nFile: "./i18n/Rating.properties"}],
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {{cssFile: string, media: string}[]}
       * @default [{cssFile:"./css/Like.css"}]
       */
      cssRequirements: [{cssFile:"./css/Rating.css"}],
      
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {string}
       */
      templateString: template,
      
      /**
       * The label to show when the toggle is on
       * @instance
       * @type {string}
       * @default ""
       */
      onLabel: "",
      
      /**
       * The label to show when the toggle is on
       * @instance
       * @type {string} 
       * @default "rating.add.label"
       */
      offLabel: "rating.add.label",
      
      /**
       * The tooltip to show when the toggle is on
       * @instance
       * @type {string}
       * @default "rating.remove.tooltip"
       */
      onTooltip: "rating.remove.tooltip",
      
      /**
       * The tooltip to show when the toggle is on. Override this to add a specific image for the "on" state.
       * 
       * @instance
       * @type {string} 
       * @default "rating.add.tooltip"
       */
      offTooltip: "rating.add.tooltip",
      
      /**
       * The CSS class to apply for the on display
       * 
       * @instance
       * @type {string} 
       * @default "rate"
       */
      toggleClass: "rate",
      
      /**
       * Extends to add the count of all likes.
       * 
       * @instance
       */
      postMixInProperties: function alfresco_renderers_Like__postMixInProperties() {
         // Set up the toggle topics..
         // If no instantiation overrides have been provided then just default to the standard topics
         // provided by the "alfresco/services/_RatingsServiceTopicMixin" class...
         this.toggleOnTopic = (this.toggleOnTopic != null) ? this.toggleOnTopic : this.addRatingTopic;
         this.toggleOnSuccessTopic = (this.toggleOnSuccessTopic != null) ? this.toggleOnSuccessTopic : this.addRatingSuccessTopic;
         this.toggleOnFailureTopic = (this.toggleOnFailureTopic != null) ? this.toggleOnFailureTopic : this.addRatingFailureTopic;
         this.toggleOffTopic = (this.toggleOffTopic != null) ? this.toggleOffTopic : this.removeRatingTopic;
         this.toggleOffSuccessTopic = (this.toggleOffSuccessTopic != null) ? this.toggleOffSuccessTopic : this.removeRatingSuccessTopic;
         this.toggleOffFailureTopic = (this.toggleOffFailureTopic != null) ? this.toggleOffFailureTopic : this.removeRatingFailureTopic;
         
         // Perform the standard setup...
         this.inherited(arguments);

         // Set the current number of likes...
         if (this.currentItem != null &&
             this.currentItem.likes != null &&
             this.currentItem.likes.totalLikes != null)
         {
            this.likeCount = this.currentItem.likes.totalLikes;
         }
      },
      
      /**
       * Overridden to get the liked state of the current item.
       * 
       * @instance
       * @returns {boolean} Indicating the initial state of the toggle.
       */
      getInitialState: function alfresco_renderers_Like__getInitialState() {
         return this.currentItem.likes.isLiked;
      },
      
      /**
       * Overrides the default implementation to check that the event is related
       * 
       * @instance
       * @returns false
       */
      relatesToMe: function alfresco_renderers_Like__relatesToMe(payload) {
         var relatesToMe = false;
         try
         {
            relatesToMe = (payload.requestConfig.data.nodeRefUri == this.currentItem.jsNode.nodeRef.uri);
         }
         catch (e) 
         {
            this.alfLog("error", "Unexpected data structures", e, payload, this);
         }
         return relatesToMe;
      },
      
      /**
       * Called whenever the "toggleOnSuccessTopic" attribute is published on
       * @instance
       */
      onToggleOnSuccess: function alfresco_renderers_Toggle__onToggleOnSuccess(payload) {
         this.inherited(arguments);
         html.set(this.countNode, payload.response.data.ratingsCount.toString());
      },
      
      /**
       * Called whenever the "toggleOffSuccessTopic" attribute is published on
       * @instance
       */
      onToggleOffSuccess: function alfresco_renderers_Toggle__onToggleOffSuccess(payload) {
         this.inherited(arguments);
         html.set(this.countNode, payload.response.data.ratingsCount.toString());
      }
   });
});