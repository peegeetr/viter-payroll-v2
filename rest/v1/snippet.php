<?php
// getting hrs difference between two time
function getTimeDifference($res)
{
    $a = new DateTime('19:45');
    $b = new DateTime('22:00');
    $interval = $a->diff($b);

    // $start_t = new DateTime($start_time);
    // $current_t = new DateTime($current_time);
    // $difference = $start_t ->diff($current_t );
    // $return_time = $difference ->format('%H:%I:%S');

    return $interval->format("%H:%I");
}
