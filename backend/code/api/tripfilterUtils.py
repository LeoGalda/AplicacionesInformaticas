from datetime import timedelta
POSIBLE_FILTERS = ['Stay in city for at least']

def apply_filter(qSet, filtr, lastTrip, strategy, src, toVisit, startDate, vacationDays):
    if filtr != None and filtr['name'] == 'Stay in city for at least':
        print('Applying Stay in city for at least')
        if filtr['used']:
            return qSet
        if lastTrip.toPort.city == filtr['cityName']:
            qSet = qSet.filter(departure__gte=lastTrip.arrival + timedelta(days=int(filtr['daysToStay'])))
            filtr['used'] = True
        else:
            qSet = qSet.filter(arrival__lte=startDate + timedelta(days=vacationDays-int(filtr['daysToStay'])-len(toVisit)+1))
    return qSet