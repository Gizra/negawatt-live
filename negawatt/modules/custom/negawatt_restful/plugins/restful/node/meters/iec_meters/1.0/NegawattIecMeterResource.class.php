<?php

/**
 * @file
 * Contains NegawattIecMeterResource.
 */
class NegawattIecMeterResource extends \NegawattEntityMeterBase {
  /**
   * Overrides \NegawattEntityBaseNode::publicFieldsInfo().
   */

  public function publicFieldsInfo() {
    $public_fields = parent::publicFieldsInfo();

    $public_fields['contract'] = array(
      'property' => 'field_contract_id',
    );

    $public_fields['meter_code'] = array(
      'property' => 'field_meter_code',
    );

    $public_fields['meter_serial'] = array(
      'property' => 'field_meter_serial',
    );

    return $public_fields;
  }

  /**
   * {@inheritdoc}
   *
   * Override RestfulEntityBase::createEntity() to test if meter already exists,
   * to allow update existing nodes in stead of creating a copy.
   */
  public function createEntity() {
    // Check if a meter with the same label exists.
    $query = new EntityFieldQuery();
    $result = $query->entityCondition('entity_type', 'node')
      ->propertyCondition('type', array('iec_meter', 'satec_meter'), 'IN')
      ->propertyCondition('title', $this->request['label'])
      ->range(0,1)
      ->execute();

    if (!empty($result['node'])) {
      // Node exists, update it.
      $id = key($result['node']);
      return parent::updateEntity($id);
    }
    // New node.
    $return = parent::createEntity();


    // Set meter category.

    $new_meter_id = $return[0]['id'];
    $wrapper = entity_metadata_wrapper('node', $new_meter_id);

    // Get vocabulary according to meter account (organic-group).
    $account = $wrapper->{OG_AUDIENCE_FIELD}->value();
    $group_id = $account->nid;
    $arr_vocabularies = og_vocab_relation_get_by_group('node', $group_id);
    $vocabulary_id = $arr_vocabularies[0]->vid;
    $vocabulary = taxonomy_vocabulary_load($vocabulary_id);

    // Try match meter description with any of the categories' match-strings
    $category = 'אחר';
    $taxonomy_tree = taxonomy_get_tree($vocabulary_id);
    $search_string = $wrapper->field_place_address->value() . ' ' . $wrapper->field_place_description->value();
    foreach ($taxonomy_tree as $term) {
      $tax_wrapper = entity_metadata_wrapper('taxonomy_term', $term->tid);
      $match_strings = $tax_wrapper->field_match_strings->value();
      $match_strings = explode('|', $match_strings);
      foreach ($match_strings as $match_str) {
        if (strpos($search_string, $match_str) !== FALSE) {
          $category = $tax_wrapper->name->value();
          // Leave both loops.
          break 2;
        }
      }
    }

    // Set meter-category.
    $arr_terms = taxonomy_get_term_by_name($category, $vocabulary->machine_name);
    $term_ids = array_keys($arr_terms);
    $term_id = $term_ids[0];

    $wrapper->{OG_VOCAB_FIELD}->set(array($term_id));
    $wrapper->save();

    // Update returned node with new category.
    $return = array($this->viewEntity($new_meter_id));

    return $return;
  }
}
