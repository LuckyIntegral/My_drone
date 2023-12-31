package my.copter.facade.index.impl;

import lombok.AllArgsConstructor;

import my.copter.facade.index.DroneInfoSearchFacade;
import my.copter.persistence.elasticsearch.document.DroneInfoIndex;
import my.copter.service.search.DroneInfoSearchService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DroneInfoSearchFacadeImpl implements DroneInfoSearchFacade {

    private final DroneInfoSearchService droneInfoSearchService;

    @Override
    public List<DroneInfoIndex> findAllByQuery(String query) {
        return droneInfoSearchService.findAllByQuery(query);
    }
}
