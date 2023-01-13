# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: message.proto

require 'google/protobuf'

require_relative 'message_types_pb'
Google::Protobuf::DescriptorPool.generated_pool.build do
  add_message "maptool.Message" do
    oneof :message_type do
      optional :add_topology_msg, :message, 1, "maptool.AddTopologyMsg"
      optional :boot_player_msg, :message, 2, "maptool.BootPlayerMsg"
      optional :bring_tokens_to_front_msg, :message, 3, "maptool.BringTokensToFrontMsg"
      optional :change_zone_display_name_msg, :message, 4, "maptool.ChangeZoneDisplayNameMsg"
      optional :clear_all_drawings_msg, :message, 5, "maptool.ClearAllDrawingsMsg"
      optional :clear_exposed_area_msg, :message, 6, "maptool.ClearExposedAreaMsg"
      optional :draw_msg, :message, 7, "maptool.DrawMsg"
      optional :edit_token_msg, :message, 8, "maptool.EditTokenMsg"
      optional :enforce_notification_msg, :message, 9, "maptool.EnforceNotificationMsg"
      optional :enforce_zone_msg, :message, 10, "maptool.EnforceZoneMsg"
      optional :enforce_zone_view_msg, :message, 11, "maptool.EnforceZoneViewMsg"
      optional :exec_function_msg, :message, 12, "maptool.ExecFunctionMsg"
      optional :exec_link_msg, :message, 13, "maptool.ExecLinkMsg"
      optional :expose_fow_msg, :message, 14, "maptool.ExposeFowMsg"
      optional :expose_pc_area_msg, :message, 15, "maptool.ExposePcAreaMsg"
      optional :get_asset_msg, :message, 16, "maptool.GetAssetMsg"
      optional :get_zone_msg, :message, 17, "maptool.GetZoneMsg"
      optional :heartbeat_msg, :message, 18, "maptool.HeartbeatMsg"
      optional :hide_fow_msg, :message, 19, "maptool.HideFowMsg"
      optional :hide_pointer_msg, :message, 20, "maptool.HidePointerMsg"
      optional :message_msg, :message, 21, "maptool.MessageMsg"
      optional :move_pointer_msg, :message, 22, "maptool.MovePointerMsg"
      optional :player_connected_msg, :message, 23, "maptool.PlayerConnectedMsg"
      optional :player_disconnected_msg, :message, 24, "maptool.PlayerDisconnectedMsg"
      optional :put_asset_msg, :message, 25, "maptool.PutAssetMsg"
      optional :put_label_msg, :message, 26, "maptool.PutLabelMsg"
      optional :put_token_msg, :message, 27, "maptool.PutTokenMsg"
      optional :put_zone_msg, :message, 28, "maptool.PutZoneMsg"
      optional :remove_asset_msg, :message, 29, "maptool.RemoveAssetMsg"
      optional :remove_label_msg, :message, 30, "maptool.RemoveLabelMsg"
      optional :remove_token_msg, :message, 31, "maptool.RemoveTokenMsg"
      optional :remove_tokens_msg, :message, 32, "maptool.RemoveTokensMsg"
      optional :remove_topology_msg, :message, 33, "maptool.RemoveTopologyMsg"
      optional :remove_zone_msg, :message, 34, "maptool.RemoveZoneMsg"
      optional :rename_zone_msg, :message, 35, "maptool.RenameZoneMsg"
      optional :restore_zone_view_msg, :message, 36, "maptool.RestoreZoneViewMsg"
      optional :send_tokens_to_back_msg, :message, 37, "maptool.SendTokensToBackMsg"
      optional :set_board_msg, :message, 38, "maptool.SetBoardMsg"
      optional :set_campaign_msg, :message, 39, "maptool.SetCampaignMsg"
      optional :set_campaign_name_msg, :message, 40, "maptool.SetCampaignNameMsg"
      optional :set_fow_msg, :message, 41, "maptool.SetFowMsg"
      optional :set_live_typing_label_msg, :message, 42, "maptool.SetLiveTypingLabelMsg"
      optional :set_token_location_msg, :message, 43, "maptool.SetTokenLocationMsg"
      optional :set_server_policy_msg, :message, 44, "maptool.SetServerPolicyMsg"
      optional :set_vision_type_msg, :message, 45, "maptool.SetVisionTypeMsg"
      optional :set_zone_grid_size_msg, :message, 46, "maptool.SetZoneGridSizeMsg"
      optional :set_zone_has_fow_msg, :message, 47, "maptool.SetZoneHasFowMsg"
      optional :set_zone_visibility_msg, :message, 48, "maptool.SetZoneVisibilityMsg"
      optional :show_pointer_msg, :message, 49, "maptool.ShowPointerMsg"
      optional :start_asset_transfer_msg, :message, 50, "maptool.StartAssetTransferMsg"
      optional :start_token_move_msg, :message, 51, "maptool.StartTokenMoveMsg"
      optional :stop_token_move_msg, :message, 52, "maptool.StopTokenMoveMsg"
      optional :toggle_token_move_waypoint_msg, :message, 53, "maptool.ToggleTokenMoveWaypointMsg"
      optional :undo_draw_msg, :message, 54, "maptool.UndoDrawMsg"
      optional :update_asset_transfer_msg, :message, 55, "maptool.UpdateAssetTransferMsg"
      optional :update_campaign_msg, :message, 56, "maptool.UpdateCampaignMsg"
      optional :update_campaign_macros_msg, :message, 57, "maptool.UpdateCampaignMacrosMsg"
      optional :update_drawing_msg, :message, 58, "maptool.UpdateDrawingMsg"
      optional :update_exposed_area_meta_msg, :message, 59, "maptool.UpdateExposedAreaMetaMsg"
      optional :update_gm_macros_msg, :message, 60, "maptool.UpdateGmMacrosMsg"
      optional :update_initiative_msg, :message, 61, "maptool.UpdateInitiativeMsg"
      optional :update_token_initiative_msg, :message, 62, "maptool.UpdateTokenInitiativeMsg"
      optional :update_token_move_msg, :message, 63, "maptool.UpdateTokenMoveMsg"
      optional :update_token_property_msg, :message, 64, "maptool.UpdateTokenPropertyMsg"
      optional :remove_add_on_library_msg, :message, 65, "maptool.RemoveAddOnLibraryMsg"
      optional :remove_all_add_on_libraries_msg, :message, 66, "maptool.RemoveAllAddOnLibrariesMsg"
      optional :add_add_on_library_msg, :message, 67, "maptool.AddAddOnLibraryMsg"
      optional :update_data_store_msg, :message, 68, "maptool.UpdateDataStoreMsg"
      optional :update_data_msg, :message, 69, "maptool.UpdateDataMsg"
      optional :update_data_namespace_msg, :message, 70, "maptool.UpdateDataNamespaceMsg"
      optional :remove_data_store_msg, :message, 71, "maptool.RemoveDataStoreMsg"
      optional :remove_data_namespace_msg, :message, 72, "maptool.RemoveDataNamespaceMsg"
      optional :remove_data_msg, :message, 73, "maptool.RemoveDataMsg"
    end
  end
end

module Maptool
  Message = Google::Protobuf::DescriptorPool.generated_pool.lookup("maptool.Message").msgclass
end
