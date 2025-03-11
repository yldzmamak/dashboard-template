import { useEffect, useState } from 'react';

type DeviceType = 'Xs' | 'Sm' | 'Md' | 'Lg' | 'Xl';

function useDeviceType(): DeviceType | null {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  useEffect(() => {
    const extraSmallMediaQuery = window.matchMedia('(max-width: 374px)');
    const smallMediaQuery = window.matchMedia('(min-width: 375px) and (max-width: 575px)');
    const mediumMediaQuery = window.matchMedia('(min-width: 576px) and (max-width: 767px)');
    const largeMediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 991px)');
    const extraLargeMediaQuery = window.matchMedia('(min-width: 992px)');

    function checkDeviceType() {
      if (extraSmallMediaQuery.matches) {
        setDeviceType('Xs');
      } else if (smallMediaQuery.matches) {
        setDeviceType('Sm');
      } else if (mediumMediaQuery.matches) {
        setDeviceType('Md');
      } else if (largeMediaQuery.matches) {
        setDeviceType('Lg');
      } else if (extraLargeMediaQuery.matches) {
        setDeviceType('Xl');
      }
    }

    extraSmallMediaQuery.addEventListener('change', checkDeviceType);
    smallMediaQuery.addEventListener('change', checkDeviceType);
    mediumMediaQuery.addEventListener('change', checkDeviceType);
    largeMediaQuery.addEventListener('change', checkDeviceType);
    extraLargeMediaQuery.addEventListener('change', checkDeviceType);

    checkDeviceType();

    return () => {
      extraSmallMediaQuery.removeEventListener('change', checkDeviceType);
      smallMediaQuery.removeEventListener('change', checkDeviceType);
      mediumMediaQuery.removeEventListener('change', checkDeviceType);
      largeMediaQuery.removeEventListener('change', checkDeviceType);
      extraLargeMediaQuery.removeEventListener('change', checkDeviceType);
    };
  }, []);

  return deviceType;
}

export default useDeviceType;
