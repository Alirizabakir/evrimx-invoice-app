<template>
  <div class="h-100 w-100">
    <div id="mapEL" ref="mapEL" class="w-100 h-100"></div>
  </div>
</template>

<script lang="ts" setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useGlobalStore } from "@/stores/global";

interface Geometry {
  coordinates: [number, number];
}

interface EventData {
  target: {
    dataItem: {
      dataContext: {
        geometry: {
          coordinates: [number, number];
        };
      };
    };
  };
}

const { Location, setLocation, Users } = useGlobalStore();
const mapEL = ref<HTMLElement | null>();
let root!: am5.Root;
const TargetLocation = computed(() => Location);
let chart;

watch(
  TargetLocation,
  (NV, OV) => {
    chart.zoomToGeoPoint(
      { latitude: NV.coordinates[1], longitude: NV.coordinates[0] },
      11,
      true,
      1000
    );
  },
  { deep: true }
);

onMounted(async () => {
  if (mapEL.value) {
    root = am5.Root.new(mapEL.value);
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoOrthographic(),
      })
    );

    let cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 30,
        y: 20,
      })
    );

    // Add labels and controls
    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Map",
        fill: "#ffff",
      })
    );

    let switchButton = cont.children.push(
      am5.Button.new(root, {
        themeTags: ["switch"],
        centerY: am5.p50,
        icon: am5.Circle.new(root, {
          themeTags: ["icon"],
        }),
      })
    );

    switchButton.on("active", function () {
      if (switchButton.get("active")) {
        chart.set("projection", am5map.geoMercator());
        chart.set("panY", "translateY");
        chart.set("rotationY", 0);
        backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
      } else {
        chart.set("projection", am5map.geoOrthographic());
        chart.set("panY", "rotateY");

        backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
      }
    });

    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Globe",
        fill: "#ffff",
      })
    );

    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    let backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0,
      strokeOpacity: 0,
    });

    // Add background polygon
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        fill: "#5E00FFFF",
      })
    );

    // Create line series for trajectory lines
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
    let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0.3,
    });

    // Create point series for markers
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
    let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    let colorset = am5.ColorSet.new(root, {});

    pointSeries.bullets.push(function () {
      let container = am5.Container.new(root, {
        tooltipText: "{title}",
        cursorOverStyle: "pointer",
      });

      const generatedColor = colorset.next();

      container.events.on("click", (event) => {

        const data = event as EventData;
        if (data) {
          const coordinates =
            data.target.dataItem.dataContext.geometry.coordinates;
          chart.zoomToGeoPoint(
              { latitude: coordinates[1], longitude: coordinates[0] },
              11,
              true,
              1000
          );
          // setLocation({ ...data, coordinates, color: generatedColor });
        }
      });

      let circle = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          fill: generatedColor,
          strokeOpacity: 0,
        })
      );

      let circle2 = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          fill: generatedColor,
          strokeOpacity: 0,
          tooltipText: "{title}",
        })
      );

      circle.animate({
        key: "scale",
        from: 6,
        to: 9,
        duration: 3000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });

      circle.animate({
        key: "opacity",
        from: 1,
        to: 0,
        duration: 3000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    Users.map((item) => {
      let city = item;
      addCity(city.id, city.longitude, city.latitude, city.title);
    });

    function addCity(id, longitude, latitude, title) {
      pointSeries.data.push({
        id: id,
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title,
      });
    }

    // Make stuff animate on load
    chart.appear(1000, 100);

    setTimeout(() => {
      switchButton.set("active", false);
    }, 2000);
  }
});

onUnmounted(() => {
  if (root) {
    root.dispose();
  }
});
</script>