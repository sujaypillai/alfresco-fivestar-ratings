package com.metaversant.alfresco.service;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import org.alfresco.model.ContentModel;
import org.alfresco.repo.security.authentication.AuthenticationUtil;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.repository.StoreRef;
import org.alfresco.service.namespace.QName;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.metaversant.alfresco.service.RatingService.RatingData;
import com.tradeshift.test.remote.Remote;
import com.tradeshift.test.remote.RemoteTestRunner;

@RunWith(RemoteTestRunner.class)
@Remote(runnerClass=SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:alfresco/application-context.xml")
public class RatingServiceTest {
	private static final String ADMIN_USER_NAME = "admin";
	
	@Autowired
	@Qualifier("MetaversantRatingService")
	private RatingService ratingService;
	
    @Autowired
    @Qualifier("NodeService")
	private NodeService nodeService;
	
	public RatingServiceTest() {
    	super();
    }
    
    @Test
    public void testWiring() {
    	assertNotNull(nodeService);
        assertNotNull(ratingService);
    }
    
   
    /**
     * Test the fact that we can create a rating.
     */
    @Test
    public void testCreate() throws Throwable {
    		AuthenticationUtil.setFullyAuthenticatedUser(ADMIN_USER_NAME);
    		StoreRef storeRef = nodeService.createStore(StoreRef.PROTOCOL_WORKSPACE, "Test_Create_" + System.currentTimeMillis());
    		NodeRef rootNodeRef = nodeService.getRootNode(storeRef);
    		NodeRef testNode1 = nodeService.createNode(rootNodeRef, ContentModel.ASSOC_CHILDREN, QName.createQName("{test}01"),
                ContentModel.TYPE_CONTENT).getChildRef();

    		ratingService.rate(testNode1, 1, "user1");
    	
    		assertTrue(ratingService.hasRatings(testNode1));
       
    }
    
    @Test
    public void testRatingData() {
    	AuthenticationUtil.setFullyAuthenticatedUser(ADMIN_USER_NAME);
		StoreRef storeRef = nodeService.createStore(StoreRef.PROTOCOL_WORKSPACE, "Test_Rating_Data_" + System.currentTimeMillis());
		NodeRef rootNodeRef = nodeService.getRootNode(storeRef);
    
		NodeRef testNode1 = nodeService.createNode(rootNodeRef, ContentModel.ASSOC_CHILDREN, QName.createQName("{test}01"),
            ContentModel.TYPE_CONTENT).getChildRef();
		
		ratingService.rate(testNode1, 1, "user1");
		ratingService.rate(testNode1, 2, "user2");
		ratingService.rate(testNode1, 3, "user3");		

    	// rating data shouldn't be null
    	RatingData ratingData = ratingService.getRatingData(testNode1);    	
    	assertNotNull(ratingData);
    	
    	// average rating should be 2.0
    	assertEquals(2.0d, ratingService.getRatingData(testNode1).getRating(),0);   
    	// total of all ratings is 6
    	assertEquals(6, ratingService.getRatingData(testNode1).getTotal());
    	// number of ratings is 3
    	assertEquals(3, ratingService.getRatingData(testNode1).getCount());    	
    }
    
    @Test
    public void testDelete() {
    	AuthenticationUtil.setFullyAuthenticatedUser(ADMIN_USER_NAME);
		StoreRef storeRef = nodeService.createStore(StoreRef.PROTOCOL_WORKSPACE, "Test_Delete_" + System.currentTimeMillis());
		NodeRef rootNodeRef = nodeService.getRootNode(storeRef);
    
		NodeRef testNode1 = nodeService.createNode(rootNodeRef, ContentModel.ASSOC_CHILDREN, QName.createQName("{test}01"),
            ContentModel.TYPE_CONTENT).getChildRef();
		
		ratingService.rate(testNode1, 1, "user1");
		ratingService.rate(testNode1, 2, "user2");
		ratingService.rate(testNode1, 3, "user3");		

    	assertTrue(ratingService.hasRatings(testNode1));

    	ratingService.deleteRatings(testNode1);
    	
    	assertFalse(ratingService.hasRatings(testNode1));

    	assertEquals(0, ratingService.getRatingData(testNode1).getRating(),0);   
    	assertEquals(0, ratingService.getRatingData(testNode1).getTotal());
    	assertEquals(0, ratingService.getRatingData(testNode1).getCount());    	
    	
    }
    
    @Test
    public void testUserRating() {
    	AuthenticationUtil.setFullyAuthenticatedUser(ADMIN_USER_NAME);
    	StoreRef storeRef = nodeService.createStore(StoreRef.PROTOCOL_WORKSPACE, "Test_User_Rating_" + System.currentTimeMillis());
		NodeRef rootNodeRef = nodeService.getRootNode(storeRef);
    
		NodeRef testNode1 = nodeService.createNode(rootNodeRef, ContentModel.ASSOC_CHILDREN, QName.createQName("{test}01"),
            ContentModel.TYPE_CONTENT).getChildRef();

		ratingService.rate(testNode1, 1, "user1");
		ratingService.rate(testNode1, 2, "user2");
		ratingService.rate(testNode1, 3, "user2");		

    	assertEquals(1, ratingService.getUserRating(testNode1, "user1"));
    	assertEquals(3, ratingService.getUserRating(testNode1, "user2"));
    	assertEquals(0, ratingService.getUserRating(testNode1, "userX"));
    }
}