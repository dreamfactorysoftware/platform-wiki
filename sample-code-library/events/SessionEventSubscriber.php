<?php
namespace DreamFactory\Samples\Events;

use Composer\EventDispatcher\EventSubscriberInterface;
use DreamFactory\Platform\Events\EventDispatcher;
use DreamFactory\Platform\Events\RestServiceEvent;
use DreamFactory\Yii\Utility\Pii;

/**
 * SessionEventSubscriber.php
 * An example class that listens for session logouts
 */
class SessionEventSubscriber implements EventSubscriberInterface
{
    /**
     * Constructor
     */
    public function __construct()
    {
        //  Register with the event dispatcher
        Pii::app()->getDispatcher()->addSubscriber( $this );
    }

    /**
     * Return the list of events to which we wish to subscribe
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return array(
            'session.login'  => array( 'onSessionLogin', 0 ),
            'session.logout' => array( 'onSessionLogout', 0 ),
        );
    }

    /**
     * Called on 'session.login'
     *
     * @param RestServiceEvent $event
     * @param string           $eventName
     * @param EventDispatcher  $dispatcher
     */
    public function onSessionLogin( RestServiceEvent $event, $eventName, $dispatcher )
    {
        //  Do something useful        
    }

    /**
     * Called on 'session.logout'
     *
     * @param RestServiceEvent $event
     * @param string           $eventName
     * @param EventDispatcher  $dispatcher
     */
    public function onSessionLogout( RestServiceEvent $event, $eventName, $dispatcher )
    {
        //  Do something useful        
    }
}
