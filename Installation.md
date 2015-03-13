# Introduction #

This customization is packaged in two separate parts: Repository extensions and Share extensions. Both must be deployed in order for the customization to work as designed. Of course, if you only want the back-end ratings service you could deploy just the repository AMP.

If you are checking out the source code, be sure to use the tag that matches the version of Alfresco you are deploying to. Currently, the code for both 3.3 Enterprise and 3.3g Community is the same with one minor difference (see [Version-Specific Notes](#Version-specific_notes.md), below). Similarly, the 3.4 Enterprise and 3.4d Community code is the same with a minor difference.

# Deploying the repository extensions #

The repository extensions are packaged as an AMP. You should be able to install the AMP into your alfresco.war using Alfresco's Module Management Tool (MMT) like you would any other AMP (See the Alfresco Wiki page on [AMPs](http://wiki.alfresco.com/wiki/Module_Management_Tool)).

Note that this AMP overrides certain out-of-the-box web scripts through Alfresco's standard extension mechanism (no Alfresco-provided files are replaced). If you have other AMPs installed that override the same scripts as this module, you may need to manually merge the changes. Specifically, the following Alfresco modules are overridden by web scripts placed in the extension directory:
  * doclist.get.js
  * evaluator.lib.js
  * search.get.js
  * search.get.json.ftl
  * search.lib.js

## Building from Source ##

If you are building from source you must first create a build.properties file. Use the build.properties.sample file included with the source as a guide. Then, run `ant deploy` from the root of the metaversant-fivestar-repo project directory. Ant will create the AMP file, merge it with your Alfresco WAR file, and then unzip the WAR to your webapp root.

# Deploying the Share extensions #

Ideally, you are deploying to a Share web application instance that has not been customized. If that is the case, consider yourself lucky and simply unzip the Share extensions package over the top of your expanded Share WAR.

If, on the other hand, your Share web application has been customized, you'll need to be careful not to compromise those customizations by deploying this code.

Specifically, the following Alfresco Share components are overridden by this module using Alfresco's standard extension mechanism (the web-extension directory):
  * Modified Documents Dashlet
  * Documents I'm Editing Dashlet
  * My Documents Dashlet
  * Document Details/Document Info
  * Document Details/Repo Document Info
  * Document Library/Document List
  * Document Library/Repo Document List
  * Search

If you have made any changes to these you may have to manually merge the files from this customization with your existing customizations.

## Building from Source ##

If you are building from source into a freshly-deployed Share WAR and you have no customizations of your own to worry about, you can use Ant to deploy the customizations. First, create a build.properties file using the included build.properties.sample file as a guide. Then, run `ant deploy` from the root of the metaversant-fivestar-share project directory. Ant will zip up the extensions and then unzip the extensions into your exploded Share WAR webapp root.

## Version-specific notes ##

### Alfresco 3.3g Community ###

If you are building from source and deploying to **Alfresco 3.3g Community**, the Recently Modified Documents dashlet will show a Freemarker error. To correct, simply apply the patch in the patches directory in the project source. After checking out the source, from the root directory of the share extensions project, do this:
`patch -p0 -i patches/3.3g-community.diff`

Then, deploy the customizations as noted above.

If you are using one of the pre-packaged, version-specific ZIPs, the patch has already been applied.

### Alfresco 3.4 Enterprise ###

There is a bug in **Alfresco 3.4.0 Enterprise** that causes problems for the ratings component on the document details page in Share. Refer to [ALF-7238](https://issues.alfresco.com/jira/browse/ALF-7238) on Alfresco Jira for technical info and a patch that you must apply for this component to work properly in 3.4 Enterprise.

You must apply this patch whether you are building from source or using one of the binary builds.

### Alfresco 3.4d Community ###

If you are building from source and deploying to **Alfresco 3.4d Community**, start with the 3.4 Enterprise code and then apply the patch in the patches directory in the project source. After checking out the source, from the root directory of the share extensions project, do this:
`patch -p0 -i patches/3.4d-community.diff`

Then, deploy the customizations as noted above.

If you are using one of the pre-packaged, version-specific ZIPs, the patch has already been applied.