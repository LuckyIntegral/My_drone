package my.copter.service.index;

import my.copter.persistence.elasticsearch.document.DroneIndex;

import java.util.List;

public interface DroneInfoSearchService {
    List<DroneIndex> findAllByQuery(String query);
}
