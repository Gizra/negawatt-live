<?php

/**
 * @file
 * Contains NegawattElectricityResource.
 */

class NegawattElectricityResource extends RestfulEntityBase {

  /**
   * Overrides \RestfulEntityBase::publicFieldsInfo().
   */
  public function publicFieldsInfo() {
    $public_fields = parent::publicFieldsInfo();

    // Remove not necessary fields.
    unset($public_fields['label']);

    $public_fields['timestamp'] = array(
      'property' => 'timestamp'
    );

    $public_fields['rate_type'] = array(
      'property' => 'rate_type'
    );

    $public_fields['type'] = array(
      'property' => 'type'
    );

    $public_fields['kwh'] = array(
      'property' => 'sum_kwh'
    );

    $public_fields['avg_power'] = array(
      'property' => 'avg_power'
    );

    $public_fields['meter'] = array(
      'property' => 'meter_nid',
      'resource' => array(
        'satec_meter' => array(
          'name' => 'meters',
          'full_view' => FALSE,
        ),
        'iec_meter' => array(
          'name' => 'meters',
          'full_view' => FALSE,
        ),
      ),
    );

    $public_fields['min_power_factor'] = array(
      'property' => 'min_power_factor',
    );

    return $public_fields;
  }
}
