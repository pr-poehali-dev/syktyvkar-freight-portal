import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Сохраняет заявку на перевозку в базу данных."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO t_p3068365_syktyvkar_freight_po.orders
          (name, phone, from_address, to_address, comment, truck, distance, price, loaders)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
        """,
        (
            body.get('name'),
            body.get('phone'),
            body.get('from'),
            body.get('to'),
            body.get('comment'),
            body.get('truck'),
            body.get('distance'),
            body.get('price'),
            body.get('loaders', False),
        )
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'id': order_id})
    }
